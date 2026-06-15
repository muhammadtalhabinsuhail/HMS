import { getPool } from "../config/db.js";
import sql from "mssql";
// GET /api/maintenance
export const getAllMaintenance = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT m.*, r.RoomName, h.Name AS HotelName, s.Name AS StaffName
      FROM Maintenance m
      JOIN Room r ON m.RoomID = r.RoomID
      JOIN Hotel h ON r.HotelID = h.HotelID
      LEFT JOIN Staff s ON m.StaffID = s.StaffID
      ORDER BY m.MaintenanceID DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/maintenance
export const createMaintenance = async (req, res) => {
  const { roomId, staffId, issue } = req.body;
  if (!roomId || !issue) return res.status(400).json({ message: "RoomID and issue required" });
  try {
    const pool = await getPool();
    const idRes = await pool.request().query("SELECT ISNULL(MAX(MaintenanceID),0)+1 AS NextID FROM Maintenance");
    await pool
      .request()
      .input("MaintenanceID", sql.Int, idRes.recordset[0].NextID)
      .input("RoomID", sql.Int, roomId)
      .input("StaffID", sql.Int, staffId || null)
      .input("Issue", sql.VarChar, issue)
      .input("Status", sql.VarChar, "Pending")
      .query("INSERT INTO Maintenance (MaintenanceID, RoomID, StaffID, Issue, Status) VALUES (@MaintenanceID, @RoomID, @StaffID, @Issue, @Status)");

    // Mark room as maintenance
    await pool.request().input("rid", sql.Int, roomId).query("UPDATE Room SET Status='Maintenance' WHERE RoomID=@rid");

    res.status(201).json({ message: "Maintenance request created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/maintenance/:id
export const updateMaintenanceStatus = async (req, res) => {
  const { status, staffId } = req.body;
  const validStatuses = ["Pending", "In Progress", "Resolved"];
  if (!validStatuses.includes(status)) return res.status(400).json({ message: "Invalid status" });

  try {
    const pool = await getPool();
    await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("status", sql.VarChar, status)
      .input("staffId", sql.Int, staffId || null)
      .query("UPDATE Maintenance SET Status=@status, StaffID=ISNULL(@staffId, StaffID) WHERE MaintenanceID=@id");

    // If resolved, mark room available
    if (status === "Resolved") {
      const m = await pool.request().input("id", sql.Int, req.params.id).query("SELECT RoomID FROM Maintenance WHERE MaintenanceID=@id");
      if (m.recordset.length > 0) {
        await pool.request().input("rid", sql.Int, m.recordset[0].RoomID).query("UPDATE Room SET Status='Available' WHERE RoomID=@rid");
      }
    }

    res.json({ message: "Maintenance updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/maintenance/:id
export const deleteMaintenance = async (req, res) => {
  try {
    const pool = await getPool();
    await pool.request().input("id", sql.Int, req.params.id).query("DELETE FROM Maintenance WHERE MaintenanceID=@id");
    res.json({ message: "Maintenance record deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


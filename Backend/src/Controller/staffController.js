import { getPool } from "../config/db.js";
import sql from "mssql";
// ─── DEPARTMENT ───────────────────────────────────────────────

export const getDepartments = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Department ORDER BY DeptID");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createDepartment = async (req, res) => {
  const { deptName } = req.body;
  if (!deptName) return res.status(400).json({ message: "Department name required" });
  try {
    const pool = await getPool();
    const idRes = await pool.request().query("SELECT ISNULL(MAX(DeptID),0)+1 AS NextID FROM Department");
    await pool
      .request()
      .input("DeptID", sql.Int, idRes.recordset[0].NextID)
      .input("DeptName", sql.VarChar, deptName)
      .query("INSERT INTO Department (DeptID, DeptName) VALUES (@DeptID, @DeptName)");
    res.status(201).json({ message: "Department created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateDepartment = async (req, res) => {
  const { deptName } = req.body;
  try {
    const pool = await getPool();
    await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("DeptName", sql.VarChar, deptName)
      .query("UPDATE Department SET DeptName=@DeptName WHERE DeptID=@id");
    res.json({ message: "Department updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const pool = await getPool();
    await pool.request().input("id", sql.Int, req.params.id).query("DELETE FROM Department WHERE DeptID=@id");
    res.json({ message: "Department deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── STAFF ───────────────────────────────────────────────────

export const getStaffByHotel = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("hotelId", sql.Int, req.params.hotelId)
      .query(`
        SELECT s.*, d.DeptName FROM Staff s
        LEFT JOIN Department d ON s.DeptID = d.DeptID
        WHERE s.HotelID = @hotelId
        ORDER BY s.StaffID
      `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createStaff = async (req, res) => {
  const { name, role, deptId } = req.body;
  if (!name || !role) return res.status(400).json({ message: "Name and role required" });
  try {
    const pool = await getPool();
    const idRes = await pool.request().query("SELECT ISNULL(MAX(StaffID),0)+1 AS NextID FROM Staff");
    await pool
      .request()
      .input("StaffID", sql.Int, idRes.recordset[0].NextID)
      .input("HotelID", sql.Int, req.params.hotelId)
      .input("Name", sql.VarChar, name)
      .input("Role", sql.VarChar, role)
      .input("DeptID", sql.Int, deptId || null)
      .query("INSERT INTO Staff (StaffID, HotelID, Name, Role, DeptID) VALUES (@StaffID, @HotelID, @Name, @Role, @DeptID)");
    res.status(201).json({ message: "Staff added" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateStaff = async (req, res) => {
  const { name, role, deptId } = req.body;
  try {
    const pool = await getPool();
    await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("Name", sql.VarChar, name)
      .input("Role", sql.VarChar, role)
      .input("DeptID", sql.Int, deptId || null)
      .query("UPDATE Staff SET Name=@Name, Role=@Role, DeptID=@DeptID WHERE StaffID=@id");
    res.json({ message: "Staff updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const pool = await getPool();
    await pool.request().input("id", sql.Int, req.params.id).query("DELETE FROM Staff WHERE StaffID=@id");
    res.json({ message: "Staff deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


import { getPool } from "../config/db.js";
import sql from "mssql";
// GET /api/hotels/:hotelId/rooms
export const getRoomsByHotel = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("hotelId", sql.Int, req.params.hotelId)
      .query("SELECT * FROM Room WHERE HotelID = @hotelId ORDER BY RoomID");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/rooms/available - for booking search
export const getAvailableRooms = async (req, res) => {
  const { hotelId, checkIn, checkOut } = req.query;
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("hotelId", sql.Int, hotelId)
      .input("checkIn", sql.Date, checkIn)
      .input("checkOut", sql.Date, checkOut)
      .query(`
        SELECT r.* FROM Room r
        WHERE r.HotelID = @hotelId
          AND r.Status = 'Available'
          AND r.RoomID NOT IN (
            SELECT br.RoomID FROM Booking_Room br
            JOIN Booking b ON br.BookingID = b.BookingID
            WHERE b.Status NOT IN ('Cancelled')
              AND b.CheckIn < @checkOut
              AND b.CheckOut > @checkIn
          )
        ORDER BY r.Price
      `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/hotels/:hotelId/rooms
export const createRoom = async (req, res) => {
  const { roomName, price, status = "Available" } = req.body;
  if (!roomName || !price) return res.status(400).json({ message: "RoomName and price required" });

  try {
    const pool = await getPool();
    const idRes = await pool.request().query("SELECT ISNULL(MAX(RoomID),0)+1 AS NextID FROM Room");
    const newId = idRes.recordset[0].NextID;

    await pool
      .request()
      .input("RoomID", sql.Int, newId)
      .input("HotelID", sql.Int, req.params.hotelId)
      .input("RoomName", sql.VarChar, roomName)
      .input("Price", sql.Decimal(10, 2), price)
      .input("Status", sql.VarChar, status)
      .query("INSERT INTO Room (RoomID, HotelID, RoomName, Price, Status) VALUES (@RoomID, @HotelID, @RoomName, @Price, @Status)");

    res.status(201).json({ message: "Room created", roomId: newId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/rooms/:id
export const updateRoom = async (req, res) => {
  const { roomName, price, status } = req.body;
  try {
    const pool = await getPool();
    await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("RoomName", sql.VarChar, roomName)
      .input("Price", sql.Decimal(10, 2), price)
      .input("Status", sql.VarChar, status)
      .query("UPDATE Room SET RoomName=@RoomName, Price=@Price, Status=@Status WHERE RoomID=@id");
    res.json({ message: "Room updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/rooms/:id
export const deleteRoom = async (req, res) => {
  try {
    const pool = await getPool();
    await pool.request().input("id", sql.Int, req.params.id).query("DELETE FROM Room WHERE RoomID=@id");
    res.json({ message: "Room deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


import { getPool } from "../config/db.js";
import sql from "mssql";
import { sendBookingNotification } from "../../emailservice.js";

// POST /api/bookings - Customer creates booking
export const createBooking = async (req, res) => {
  const { hotelId, checkIn, checkOut, roomIds, adults, children } = req.body;
  const userId = req.user.userId;

  if (!hotelId || !checkIn || !checkOut || !roomIds || roomIds.length === 0) {
    return res.status(400).json({ message: "Missing required booking fields" });
  }
console.log('hi');

  try {
    const pool = await getPool();

    // 1. Get room details (name + price) — parameterized
    const roomList = roomIds.map((_, i) => `@rid${i}`).join(",");
    const roomReq = pool.request();
    roomIds.forEach((id, i) => roomReq.input(`rid${i}`, sql.Int, id));
    const roomsResult = await roomReq.query(
      `SELECT RoomID, RoomName, Price FROM Room WHERE RoomID IN (${roomList})`
    );
    const rooms = roomsResult.recordset;

    // 2. Calculate pricing
    const nights = Math.ceil(
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
    );
    if (nights <= 0)
      return res.status(400).json({ message: "Invalid date range" });

    const baseTotal = rooms.reduce((sum, r) => sum + parseFloat(r.Price), 0);
    const extraAdults = Math.max(0, (adults || 1) - 2);
    const grandTotal = baseTotal * nights + extraAdults * 20 * nights;

    // 3. Create booking record
    const idRes = await pool
      .request()
      .query("SELECT ISNULL(MAX(BookingID),0)+1 AS NextID FROM Booking");
    const bookingId = idRes.recordset[0].NextID;

    await pool
      .request()
      .input("BookingID", sql.Int, bookingId)
      .input("UserID", sql.Int, userId)
      .input("HotelID", sql.Int, hotelId)
      .input("BookingDate", sql.Date, new Date())
      .input("CheckIn", sql.Date, checkIn)
      .input("CheckOut", sql.Date, checkOut)
      .input("GrandTotal", sql.Decimal(10, 2), grandTotal)
      .input("Status", sql.VarChar, "Confirmed")
      .query(`
        INSERT INTO Booking (BookingID, UserID, HotelID, BookingDate, CheckIn, CheckOut, GrandTotal, Status)
        VALUES (@BookingID, @UserID, @HotelID, @BookingDate, @CheckIn, @CheckOut, @GrandTotal, @Status)
      `);

    // 4. Link rooms and mark occupied
    for (const roomId of roomIds) {
      await pool
        .request()
        .input("BookingID", sql.Int, bookingId)
        .input("RoomID", sql.Int, roomId)
        .query("INSERT INTO Booking_Room (BookingID, RoomID) VALUES (@BookingID, @RoomID)");

      await pool
        .request()
        .input("RoomID", sql.Int, roomId)
        .query("UPDATE Room SET Status='Occupied' WHERE RoomID=@RoomID");
    }

    // 5. Fetch hotel, guest, and all admin emails for notification
    const [hotelRes, guestRes, adminRes] = await Promise.all([
      pool.request().input("hid", sql.Int, hotelId)
        .query("SELECT Name, Location FROM Hotel WHERE HotelID = @hid"),
      pool.request().input("uid", sql.Int, userId)
        .query("SELECT Name, Email, Phone FROM Users WHERE UserID = @uid"),
      pool.request()
        .query("SELECT Email FROM Users WHERE RoleID = 1"),
    ]);

    const hotel = hotelRes.recordset[0];
    const guest = guestRes.recordset[0];
    const adminEmails = adminRes.recordset.map((a) => a.Email).filter(Boolean);

    // 6. Send email non-blocking
    sendBookingNotification({
      adminEmails,
      bookingId,
      guestName: guest?.Name || "Guest",
      guestEmail: guest?.Email || "",
      guestPhone: guest?.Phone || "",
      hotelName: hotel?.Name || "Hotel",
      hotelLocation: hotel?.Location || "",
      rooms,
      grandTotal,
      checkIn,
      checkOut,
      adults: adults || 1,
      children: children || 0,
    }).catch((err) => {
      console.error("Email notification failed:", err.message);
    });

    res.status(201).json({ message: "Booking confirmed", bookingId, grandTotal, nights });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// GET /api/bookings/my - Customer own bookings
export const getMyBookings = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("userId", sql.Int, req.user.userId)
      .query(`
        SELECT b.*, h.Name AS HotelName, h.Location,
          (SELECT STRING_AGG(r.RoomName, ', ') FROM Booking_Room br JOIN Room r ON br.RoomID = r.RoomID WHERE br.BookingID = b.BookingID) AS Rooms
        FROM Booking b
        JOIN Hotel h ON b.HotelID = h.HotelID
        WHERE b.UserID = @userId
        ORDER BY b.BookingDate DESC
      `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/bookings - Admin all bookings
export const getAllBookings = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT b.*, h.Name AS HotelName, h.Location, u.Name AS GuestName, u.Email AS GuestEmail, u.Phone AS GuestPhone,
        (SELECT STRING_AGG(r.RoomName, ', ') FROM Booking_Room br JOIN Room r ON br.RoomID = r.RoomID WHERE br.BookingID = b.BookingID) AS Rooms
      FROM Booking b
      JOIN Hotel h ON b.HotelID = h.HotelID
      JOIN Users u ON b.UserID = u.UserID
      ORDER BY b.BookingID DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/bookings/:id/status
export const updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  const validStatuses = ["Confirmed", "Cancelled", "Completed"];
  if (!validStatuses.includes(status))
    return res.status(400).json({ message: "Invalid status" });

  try {
    const pool = await getPool();
    await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("status", sql.VarChar, status)
      .query("UPDATE Booking SET Status=@status WHERE BookingID=@id");

    if (status === "Cancelled") {
      const rooms = await pool.request().input("id", sql.Int, req.params.id)
        .query("SELECT RoomID FROM Booking_Room WHERE BookingID=@id");
      for (const r of rooms.recordset) {
        await pool.request().input("rid", sql.Int, r.RoomID)
          .query("UPDATE Room SET Status='Available' WHERE RoomID=@rid");
      }
    }
    res.json({ message: "Booking status updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/bookings/:id
export const getBookingById = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query(`
        SELECT b.*, h.Name AS HotelName, h.Location, u.Name AS GuestName
        FROM Booking b JOIN Hotel h ON b.HotelID = h.HotelID JOIN Users u ON b.UserID = u.UserID
        WHERE b.BookingID = @id
      `);
    if (result.recordset.length === 0)
      return res.status(404).json({ message: "Booking not found" });
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
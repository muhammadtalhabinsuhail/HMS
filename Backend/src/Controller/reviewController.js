import { getPool } from "../config/db.js";
import sql from "mssql";
// GET /api/hotels/:hotelId/reviews
export const getReviews = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("hotelId", sql.Int, req.params.hotelId)
      .query(`
        SELECT r.*, u.Name AS GuestName,
          rr.ResponseText, rr.ResponseDate, ru.Name AS AdminName
        FROM Review r
        JOIN Users u ON r.UserID = u.UserID
        LEFT JOIN Review_Response rr ON r.ReviewID = rr.ReviewID
        LEFT JOIN Users ru ON rr.AdminID = ru.UserID
        WHERE r.HotelID = @hotelId
        ORDER BY r.ReviewDate DESC
      `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/hotels/:hotelId/reviews - Customer
export const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const userId = req.user.userId;
  const hotelId = req.params.hotelId;

  if (!rating || rating < 1 || rating > 5) return res.status(400).json({ message: "Rating must be 1-5" });

  try {
    const pool = await getPool();

    // Must have a completed booking
    const hasBooking = await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("hotelId", sql.Int, hotelId)
      .query(`SELECT BookingID FROM Booking WHERE UserID=@userId AND HotelID=@hotelId AND Status='Completed'`);

    if (hasBooking.recordset.length === 0) {
      return res.status(403).json({ message: "You can only review hotels you have stayed at" });
    }

    const idRes = await pool.request().query("SELECT ISNULL(MAX(ReviewID),0)+1 AS NextID FROM Review");
    await pool
      .request()
      .input("ReviewID", sql.Int, idRes.recordset[0].NextID)
      .input("UserID", sql.Int, userId)
      .input("HotelID", sql.Int, hotelId)
      .input("Rating", sql.Int, rating)
      .input("Comment", sql.VarChar, comment || "")
      .input("ReviewDate", sql.Date, new Date())
      .query("INSERT INTO Review (ReviewID, UserID, HotelID, Rating, Comment, ReviewDate) VALUES (@ReviewID, @UserID, @HotelID, @Rating, @Comment, @ReviewDate)");

    res.status(201).json({ message: "Review submitted" });
  } catch (err) {
    if (err.number === 2627) return res.status(409).json({ message: "You have already reviewed this hotel" });
    res.status(500).json({ message: err.message });
  }
};

// POST /api/reviews/:id/respond - Admin
export const respondToReview = async (req, res) => {
  const { responseText } = req.body;
  const adminId = req.user.userId;

  try {
    const pool = await getPool();
    const idRes = await pool.request().query("SELECT ISNULL(MAX(ResponseID),0)+1 AS NextID FROM Review_Response");
    await pool
      .request()
      .input("ResponseID", sql.Int, idRes.recordset[0].NextID)
      .input("ReviewID", sql.Int, req.params.id)
      .input("AdminID", sql.Int, adminId)
      .input("ResponseText", sql.VarChar, responseText)
      .input("ResponseDate", sql.Date, new Date())
      .query("INSERT INTO Review_Response (ResponseID, ReviewID, AdminID, ResponseText, ResponseDate) VALUES (@ResponseID, @ReviewID, @AdminID, @ResponseText, @ResponseDate)");

    res.status(201).json({ message: "Response posted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/reviews - Admin gets all reviews
export const getAllReviews = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT r.*, u.Name AS GuestName, h.Name AS HotelName,
        rr.ResponseText, rr.ResponseDate
      FROM Review r
      JOIN Users u ON r.UserID = u.UserID
      JOIN Hotel h ON r.HotelID = h.HotelID
      LEFT JOIN Review_Response rr ON r.ReviewID = rr.ReviewID
      ORDER BY r.ReviewDate DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


import { getPool } from "../config/db.js";
import sql from "mssql";

// GET /api/analytics/revenue
// Returns earned revenue for the last 5 months (non-cancelled bookings)
export const getRevenueByMonth = async (req, res) => {
  try {
    const pool = await getPool();

    const result = await pool.request().query(`
      SELECT
        YEAR(BookingDate)  AS yr,
        MONTH(BookingDate) AS mo,
        SUM(GrandTotal)    AS revenue
      FROM Booking
      WHERE
        Status != 'Cancelled'
        AND BookingDate >= DATEADD(MONTH, -4, DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1))
      GROUP BY
        YEAR(BookingDate),
        MONTH(BookingDate)
      ORDER BY yr ASC, mo ASC
    `);

    // Build a guaranteed 5-slot array (current month + 4 before it)
    // so the chart always shows 5 bars even if some months have zero bookings
    const now = new Date();
    const months = [];

    for (let i = 4; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const yr = d.getFullYear();
      const mo = d.getMonth() + 1; // JS months are 0-based

      const label = d.toLocaleString("en-GB", { month: "short", year: "numeric" });

      const row = result.recordset.find((r) => r.yr === yr && r.mo === mo);
      months.push({
        month: label,
        revenue: row ? parseFloat(row.revenue).toFixed(2) : "0.00",
      });
    }

    res.json(months);
  } catch (err) {
    console.error("Analytics revenue error:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET /api/analytics/bookings-status
// Returns booking status counts for the current calendar month (for pie chart)
export const getBookingStatusCurrentMonth = async (req, res) => {
  try {
    const pool = await getPool();

    const result = await pool.request().query(`
      SELECT
        Status,
        COUNT(*) AS count
      FROM Booking
      WHERE
        YEAR(BookingDate)  = YEAR(GETDATE())
        AND MONTH(BookingDate) = MONTH(GETDATE())
      GROUP BY Status
    `);

    // Ensure all three statuses are always present (zero if no data)
    const statuses = ["Confirmed", "Completed", "Cancelled"];
    const data = statuses.map((status) => {
      const row = result.recordset.find((r) => r.Status === status);
      return { status, count: row ? parseInt(row.count) : 0 };
    });

    res.json(data);
  } catch (err) {
    console.error("Analytics bookings-status error:", err);
    res.status(500).json({ message: err.message });
  }
};
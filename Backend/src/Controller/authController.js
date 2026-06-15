import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";


import { sql, getPool } from "../config/db.js";

// await getPool(); // MUST be called before queries
// const pool = await sql.connect();

// const result = await pool.request().query("SELECT 1");


// POST /api/auth/signup
export const signup = async (req, res) => {
  const { name, email, phone, password, roleId = 2 } = req.body; // default role: Customer
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  try {
    const pool = await getPool();

    // Check duplicate email
    const existing = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT UserID FROM Users WHERE Email = @email");

    if (existing.recordset.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    // Get next UserID
    const idResult = await pool.request().query("SELECT ISNULL(MAX(UserID),0)+1 AS NextID FROM Users");
    const newId = idResult.recordset[0].NextID;

    await pool
      .request()
      .input("UserID", sql.Int, newId)
      .input("Name", sql.VarChar, name)
      .input("Email", sql.VarChar, email)
      .input("Phone", sql.VarChar, phone || null)
      .input("Password", sql.VarChar, hashed)
      .input("RoleID", sql.Int, roleId)
      .query(
        "INSERT INTO Users (UserID, Name, Email, Phone, Password, RoleID) VALUES (@UserID, @Name, @Email, @Phone, @Password, @RoleID)"
      );

    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query(`
        SELECT u.UserID, u.Name, u.Email, u.Phone, u.Password, r.RoleID, r.RoleName
        FROM Users u
        JOIN Role r ON u.RoleID = r.RoleID
        WHERE u.Email = @email
      `);

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.recordset[0];
    const match = await bcrypt.compare(password, user.Password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.UserID, name: user.Name, email: user.Email, roleName: user.RoleName, roleId: user.RoleID },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.UserID,
        name: user.Name,
        email: user.Email,
        phone: user.Phone,
        role: user.RoleName,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/auth/me
export const me = async (req, res) => {
  res.json({ user: req.user });
};


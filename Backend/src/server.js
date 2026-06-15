// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const { getPool } = require("./config/db");
// const routes = require("./routes/index");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use("/api", routes);

// // Health check
// app.get("/health", (req, res) => res.json({ status: "ok", timestamp: new Date() }));

// // 404 handler
// app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// // Error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Internal Server Error" });
// });

// // Start server after DB connection
// const start = async () => {
//   try {
//     await getPool();
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//     });
//   } catch (err) {
//     console.error("❌ Failed to connect to DB:", err.message);
//     process.exit(1);
//   }
// };

// start();

  // import app from "./app.js";
  // import dotenv from "dotenv";

  // dotenv.config()

  // const PORT = process.env.PORT || 3000;


  // app.get("/", (req, res) => {
  //   res.send(`
  //     <h2>Continue with Google (Arctic + PKCE)</h2>
  //     <a href="/auth/google"><button>Continue with Google</button></a>
  //   `);
  // });

  // // hata dena  '0.0.0.0', 

  // app.listen(PORT, '0.0.0.0', () => {
  //   console.log(`🚀 Server running on http://localhost:${PORT}`);
  // });





import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;




app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
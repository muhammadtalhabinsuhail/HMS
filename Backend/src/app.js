// // import express from "express";
// // import cors from "cors";
// // import dotenv from "dotenv";
// // import bodyParser from "body-parser";
// // import cookieParser from "cookie-parser";
// //  const router = express.Router()

// // const app = express();
// // app.set("trust proxy", 1);
// // dotenv.config();

// // app.use(cors({
// //   origin: [
   
// //     "http://localhost:5000"
// //   ],
// //   credentials: true,
// //   origin: true, exposedHeaders: ["Set-Cookie"]
// // }));

// // app.use(cookieParser());
// // app.use(express.json());
// // app.use(bodyParser.json());

// // app.use(express.urlencoded({ extended: true }));


// // app.use((req, res, next) => {
// //   res.locals.user = req.user;
// //   return next();
// // });

// // // Base route
// // app.get("/", (req, res) => {
// //   res.send("API is working ✅");
// // });


// // const { authenticate, authorize } = require("../middleware/auth");

// // // Controllers
// // const auth = require("./Controller/authController");
// // const hotels = require("./Controller/hotelController");
// // const rooms = require("./Controller/roomController");
// // const bookings = require("./Controller/bookingController");
// // const staff = require("./Controller/staffController");
// // const maintenance = require("./Controller/maintenanceController");
// // const reviews = require("./Controller/reviewController");

// // // ─── AUTH ───────────────────────────────────────────────────
// // router.post("/auth/signup", auth.signup);
// // router.post("/auth/login", auth.login);
// // router.get("/auth/me", authenticate, auth.me);

// // // ─── HOTELS ─────────────────────────────────────────────────
// // router.get("/hotels", hotels.getAllHotels);
// // router.get("/hotels/:id", hotels.getHotelById);
// // router.post("/hotels", authenticate, authorize("Admin"), hotels.createHotel);
// // router.put("/hotels/:id", authenticate, authorize("Admin"), hotels.updateHotel);
// // router.delete("/hotels/:id", authenticate, authorize("Admin"), hotels.deleteHotel);

// // // ─── ROOMS ──────────────────────────────────────────────────
// // router.get("/hotels/:hotelId/rooms", rooms.getRoomsByHotel);
// // router.get("/rooms/available", rooms.getAvailableRooms);
// // router.post("/hotels/:hotelId/rooms", authenticate, authorize("Admin"), rooms.createRoom);
// // router.put("/rooms/:id", authenticate, authorize("Admin"), rooms.updateRoom);
// // router.delete("/rooms/:id", authenticate, authorize("Admin"), rooms.deleteRoom);

// // // ─── BOOKINGS ───────────────────────────────────────────────
// // router.post("/bookings", authenticate, authorize("Customer"), bookings.createBooking);
// // router.get("/bookings/my", authenticate, authorize("Customer"), bookings.getMyBookings);
// // router.get("/bookings", authenticate, authorize("Admin"), bookings.getAllBookings);
// // router.get("/bookings/:id", authenticate, bookings.getBookingById);
// // router.put("/bookings/:id/status", authenticate, authorize("Admin"), bookings.updateBookingStatus);

// // // ─── DEPARTMENTS ─────────────────────────────────────────────
// // router.get("/departments", authenticate, staff.getDepartments);
// // router.post("/departments", authenticate, authorize("Admin"), staff.createDepartment);
// // router.put("/departments/:id", authenticate, authorize("Admin"), staff.updateDepartment);
// // router.delete("/departments/:id", authenticate, authorize("Admin"), staff.deleteDepartment);

// // // ─── STAFF ──────────────────────────────────────────────────
// // router.get("/hotels/:hotelId/staff", authenticate, authorize("Admin"), staff.getStaffByHotel);
// // router.post("/hotels/:hotelId/staff", authenticate, authorize("Admin"), staff.createStaff);
// // router.put("/staff/:id", authenticate, authorize("Admin"), staff.updateStaff);
// // router.delete("/staff/:id", authenticate, authorize("Admin"), staff.deleteStaff);

// // // ─── MAINTENANCE ─────────────────────────────────────────────
// // router.get("/maintenance", authenticate, authorize("Admin"), maintenance.getAllMaintenance);
// // router.post("/maintenance", authenticate, authorize("Admin"), maintenance.createMaintenance);
// // router.put("/maintenance/:id", authenticate, authorize("Admin"), maintenance.updateMaintenanceStatus);
// // router.delete("/maintenance/:id", authenticate, authorize("Admin"), maintenance.deleteMaintenance);

// // // ─── REVIEWS ─────────────────────────────────────────────────
// // router.get("/hotels/:hotelId/reviews", hotels.getAllHotels && reviews.getReviews);
// // router.post("/hotels/:hotelId/reviews", authenticate, authorize("Customer"), reviews.createReview);
// // router.post("/reviews/:id/respond", authenticate, authorize("Admin"), reviews.respondToReview);
// // router.get("/reviews", authenticate, authorize("Admin"), reviews.getAllReviews);


// // export default app;


// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";

// import { authenticate, authorize } from "./middlewares/authMiddleware.js";

// import * as auth from "./Controller/authController.js";
// import * as hotels from "./Controller/hotelController.js";
// import * as rooms from "./Controller/roomController.js";
// import * as bookings from "./Controller/bookingController.js";
// import * as staff from "./Controller/staffController.js";
// import * as maintenance from "./Controller/maintenanceController.js";
// import * as reviews from "./Controller/reviewController.js";
// import  {getPool, sql} from "./config/db.js";
// import multer from "multer";
// import * as uploadCtrl from "./Controller/Uploadcontroller.js";

// dotenv.config();

// const app = express();
// const router = express.Router();

// app.set("trust proxy", 1);

// // ✅ Fixed CORS
// app.use(cors({
//   origin: "http://localhost:5000",
//   credentials: true,
//   exposedHeaders: ["Set-Cookie"]
// }));

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Base route
// app.get("/", (req, res) => {
//   res.send("API is working ✅");
// });


// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 8 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) cb(null, true);
//     else cb(new Error("Only image files are allowed"), false);
//   },
// });

// app.get("/hotels", async (req, res) => {
//   try {
//     const pool = await getPool();

//     const result = await pool.request().query("SELECT * FROM Hotel");

//     res.json(result.recordset);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("DB Error");
//   }
// });


// app.get("/", async (req, res) => {
//   const result = await pool.query("SELECT NOW()");
//   res.json(result.rows[0]);
// });

// // ─── AUTH ─────────────────────────
// router.post("/auth/signup", auth.signup);
// router.post("/auth/login", auth.login);
// router.get("/auth/me", authenticate, auth.me);

// // ─── HOTELS ───────────────────────
// router.get("/hotels", hotels.getAllHotels);
// router.get("/hotels/:id", hotels.getHotelById);
// router.post("/hotels", authenticate, authorize("Admin"), hotels.createHotel);
// router.put("/hotels/:id", authenticate, authorize("Admin"), hotels.updateHotel);
// router.delete("/hotels/:id", authenticate, authorize("Admin"), hotels.deleteHotel);

// // ─── ROOMS ────────────────────────
// router.get("/hotels/:hotelId/rooms", rooms.getRoomsByHotel);
// router.get("/rooms/available", rooms.getAvailableRooms);
// router.post("/hotels/:hotelId/rooms", authenticate, authorize("Admin"), rooms.createRoom);
// router.put("/rooms/:id", authenticate, authorize("Admin"), rooms.updateRoom);
// router.delete("/rooms/:id", authenticate, authorize("Admin"), rooms.deleteRoom);

// // ─── BOOKINGS ─────────────────────
// router.post("/bookings", authenticate, authorize("Customer"), bookings.createBooking);
// router.get("/bookings/my", authenticate, authorize("Customer"), bookings.getMyBookings);
// router.get("/bookings", authenticate, authorize("Admin"), bookings.getAllBookings);
// router.get("/bookings/:id", authenticate, bookings.getBookingById);
// router.put("/bookings/:id/status", authenticate, authorize("Admin"), bookings.updateBookingStatus);

// // ─── STAFF ────────────────────────
// router.get("/departments", authenticate, staff.getDepartments);
// router.post("/departments", authenticate, authorize("Admin"), staff.createDepartment);

// // ─── REVIEWS ──────────────────────
// router.get("/hotels/:hotelId/reviews", reviews.getReviews);
// router.post("/hotels/:hotelId/reviews", authenticate, authorize("Customer"), reviews.createReview);

// // ✅ Attach router
// app.use("/api", router);

// // ✅ Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// export default app;




import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer";
import * as analytics from "./Controller/analyticsController.js";

// Middleware
import { authenticate, authorize } from "./middlewares/authMiddleware.js";

// Controllers
import * as auth from "./Controller/authController.js";
import * as hotels from "./Controller/hotelController.js";
import * as rooms from "./Controller/roomController.js";
import * as bookings from "./Controller/bookingController.js";
import * as staff from "./Controller/staffController.js";
import * as maintenance from "./Controller/maintenanceController.js";
import * as reviews from "./Controller/reviewController.js";
import * as uploadCtrl from "./Controller/uploadController.js";

// DB
import { getPool, sql } from "./config/db.js";

dotenv.config();

const app = express();
const router = express.Router();

app.set("trust proxy", 1);

// ─────────────────────────────────────────────
// CORS
// ─────────────────────────────────────────────
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
  })
);

// ─────────────────────────────────────────────
// Middlewares
// ─────────────────────────────────────────────
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─────────────────────────────────────────────
// Multer Config
// ─────────────────────────────────────────────
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

// ─────────────────────────────────────────────
// Base Route
// ─────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("API is working ✅");
});

// ─────────────────────────────────────────────
// Test DB Route
// ─────────────────────────────────────────────
app.get("/test-db", async (req, res) => {
  try {
    const pool = await getPool();

    const result = await pool.request().query("SELECT * FROM Hotel");

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB Error");
  }
});

// ─────────────────────────────────────────────
// AUTH ROUTES
// ─────────────────────────────────────────────
router.post("/auth/signup", auth.signup);

router.post("/auth/login", auth.login);

router.get("/auth/me", authenticate, auth.me);

// ─────────────────────────────────────────────
// HOTEL ROUTES
// ─────────────────────────────────────────────
router.get("/hotels", hotels.getAllHotels);

router.get("/hotels/:id", hotels.getHotelById);

router.post(
  "/hotels",
  authenticate,
  authorize("Admin"),
  hotels.createHotel
);

router.put(
  "/hotels/:id",
  authenticate,
  authorize("Admin"),
  hotels.updateHotel
);

router.delete(
  "/hotels/:id",
  authenticate,
  authorize("Admin"),
  hotels.deleteHotel
);

// ─────────────────────────────────────────────
// HOTEL PICTURES
// ─────────────────────────────────────────────
router.get(
  "/hotels/:hotelId/pictures",
  uploadCtrl.getHotelPictures
);

router.post(
  "/hotels/:hotelId/pictures",
  authenticate,
  authorize("Admin"),
  upload.single("image"),
  uploadCtrl.uploadHotelPicture
);

router.delete(
  "/hotels/pictures/:picId",
  authenticate,
  authorize("Admin"),
  uploadCtrl.deleteHotelPicture
);

// ─────────────────────────────────────────────
// ROOM ROUTES
// ─────────────────────────────────────────────
router.get(
  "/hotels/:hotelId/rooms",
  rooms.getRoomsByHotel
);

router.get(
  "/rooms/available",
  rooms.getAvailableRooms
);

router.post(
  "/hotels/:hotelId/rooms",
  authenticate,
  authorize("Admin"),
  rooms.createRoom
);

router.put(
  "/rooms/:id",
  authenticate,
  authorize("Admin"),
  rooms.updateRoom
);

router.delete(
  "/rooms/:id",
  authenticate,
  authorize("Admin"),
  rooms.deleteRoom
);

// ─────────────────────────────────────────────
// BOOKING ROUTES
// ─────────────────────────────────────────────
router.post(
  "/bookings",
  authenticate,
  authorize("Customer"),
  bookings.createBooking
);

router.get(
  "/bookings/my",
  authenticate,
  authorize("Customer"),
  bookings.getMyBookings
);

router.get(
  "/bookings",
  authenticate,
  authorize("Admin"),
  bookings.getAllBookings
);

router.get(
  "/bookings/:id",
  authenticate,
  bookings.getBookingById
);

router.put(
  "/bookings/:id/status",
  authenticate,
  authorize("Admin"),
  bookings.updateBookingStatus
);

// ─────────────────────────────────────────────
// DEPARTMENT ROUTES
// ─────────────────────────────────────────────
router.get(
  "/departments",
  authenticate,
  staff.getDepartments
);

router.post(
  "/departments",
  authenticate,
  authorize("Admin"),
  staff.createDepartment
);

router.put(
  "/departments/:id",
  authenticate,
  authorize("Admin"),
  staff.updateDepartment
);

router.delete(
  "/departments/:id",
  authenticate,
  authorize("Admin"),
  staff.deleteDepartment
);

// ─────────────────────────────────────────────
// STAFF ROUTES
// ─────────────────────────────────────────────
router.get(
  "/hotels/:hotelId/staff",
  authenticate,
  authorize("Admin"),
  staff.getStaffByHotel
);

router.post(
  "/hotels/:hotelId/staff",
  authenticate,
  authorize("Admin"),
  staff.createStaff
);

router.put(
  "/staff/:id",
  authenticate,
  authorize("Admin"),
  staff.updateStaff
);

router.delete(
  "/staff/:id",
  authenticate,
  authorize("Admin"),
  staff.deleteStaff
);

// ─────────────────────────────────────────────
// MAINTENANCE ROUTES
// ─────────────────────────────────────────────
router.get(
  "/maintenance",
  authenticate,
  authorize("Admin"),
  maintenance.getAllMaintenance
);

router.post(
  "/maintenance",
  authenticate,
  authorize("Admin"),
  maintenance.createMaintenance
);

router.put(
  "/maintenance/:id",
  authenticate,
 authorize("Admin"),
  maintenance.updateMaintenanceStatus
);

router.delete(
  "/maintenance/:id",
  authenticate,
  authorize("Admin"),
  maintenance.deleteMaintenance
);

// ─────────────────────────────────────────────
// REVIEW ROUTES
// ─────────────────────────────────────────────
router.get(
  "/hotels/:hotelId/reviews",
  reviews.getReviews
);

router.post(
  "/hotels/:hotelId/reviews",
  authenticate,
  authorize("Customer"),
  reviews.createReview
);

router.post(
  "/reviews/:id/respond",
  authenticate,
  authorize("Admin"),
  reviews.respondToReview
);

router.get(
  "/reviews",
  authenticate,
  authorize("Admin"),
  reviews.getAllReviews
);


// ANALYTICS ROUTES
router.get("/analytics/revenue",         authenticate, authorize("Admin"), analytics.getRevenueByMonth);
router.get("/analytics/bookings-status", authenticate, authorize("Admin"), analytics.getBookingStatusCurrentMonth);

// ─────────────────────────────────────────────
// API PREFIX
// ─────────────────────────────────────────────
app.use("/api", router);

// ─────────────────────────────────────────────
// SERVER
// ─────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
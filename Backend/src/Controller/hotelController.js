// import { getPool } from "../config/db.js";
// import sql from "mssql";
// // GET /api/hotels
// export const getAllHotels = async (req, res) => {
//   try {
//     const pool = await getPool();
//     const result = await pool.request().query(`
//       SELECT h.*, 
//         (SELECT TOP 1 HotelPic FROM HotelPics WHERE HotelID = h.HotelID) AS MainImage
//       FROM Hotel h
//       ORDER BY h.HotelID
//     `);
//     res.json(result.recordset);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GET /api/hotels/:id
// export const getHotelById = async (req, res) => {
//   try {
//     const pool = await getPool();
//     const hotel = await pool
//       .request()
//       .input("id", sql.Int, req.params.id)
//       .query("SELECT * FROM Hotel WHERE HotelID = @id");

//     if (hotel.recordset.length === 0) return res.status(404).json({ message: "Hotel not found" });

//     const pics = await pool
//       .request()
//       .input("id", sql.Int, req.params.id)
//       .query("SELECT * FROM HotelPics WHERE HotelID = @id");

//     res.json({ ...hotel.recordset[0], images: pics.recordset });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // POST /api/hotels
// export const createHotel = async (req, res) => {
//   const { name, location, checkinTime, checkoutTime, images = [] } = req.body;
//   if (!name || !location) return res.status(400).json({ message: "Name and location required" });

//   try {
//     const pool = await getPool();
//     const idRes = await pool.request().query("SELECT ISNULL(MAX(HotelID),0)+1 AS NextID FROM Hotel");
//     const newId = idRes.recordset[0].NextID;

//     await pool
//       .request()
//       .input("HotelID", sql.Int, newId)
//       .input("Name", sql.VarChar, name)
//       .input("Location", sql.VarChar, location)
//       .input("CheckinTime", sql.VarChar, checkinTime || "14:00")
//       .input("CheckoutTime", sql.VarChar, checkoutTime || "11:00")
//       .query("INSERT INTO Hotel (HotelID, Name, Location, CheckinTime, CheckoutTime) VALUES (@HotelID, @Name, @Location, @CheckinTime, @CheckoutTime)");

//     // Insert images
//     for (let i = 0; i < images.length; i++) {
//       const picIdRes = await pool.request().query("SELECT ISNULL(MAX(HotelPicsID),0)+1 AS NextID FROM HotelPics");
//       await pool
//         .request()
//         .input("HotelPicsID", sql.Int, picIdRes.recordset[0].NextID)
//         .input("HotelID", sql.Int, newId)
//         .input("HotelPic", sql.VarChar(sql.MAX), images[i])
//         .query("INSERT INTO HotelPics (HotelPicsID, HotelID, HotelPic) VALUES (@HotelPicsID, @HotelID, @HotelPic)");
//     }

//     res.status(201).json({ message: "Hotel created", hotelId: newId });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // PUT /api/hotels/:id
// export const updateHotel = async (req, res) => {
//   const { name, location, checkinTime, checkoutTime } = req.body;
//   try {
//     const pool = await getPool();
//     await pool
//       .request()
//       .input("id", sql.Int, req.params.id)
//       .input("Name", sql.VarChar, name)
//       .input("Location", sql.VarChar, location)
//       .input("CheckinTime", sql.VarChar, checkinTime)
//       .input("CheckoutTime", sql.VarChar, checkoutTime)
//       .query("UPDATE Hotel SET Name=@Name, Location=@Location, CheckinTime=@CheckinTime, CheckoutTime=@CheckoutTime WHERE HotelID=@id");

//     res.json({ message: "Hotel updated" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE /api/hotels/:id
// export const deleteHotel = async (req, res) => {
//   try {
//     const pool = await getPool();
//     await pool.request().input("id", sql.Int, req.params.id).query("DELETE FROM HotelPics WHERE HotelID=@id");
//     await pool.request().input("id", sql.Int, req.params.id).query("DELETE FROM Hotel WHERE HotelID=@id");
//     res.json({ message: "Hotel deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };







import { getPool } from "../config/db.js";
import sql from "mssql";
import cloudinary from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});












export const getAllHotels = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT h.*, 
        (SELECT TOP 1 HotelPic FROM HotelPics WHERE HotelID = h.HotelID) AS MainImage
      FROM Hotel h
      ORDER BY h.HotelID
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/hotels/:id
export const getHotelById = async (req, res) => {
  try {
    const pool = await getPool();
    const hotel = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("SELECT * FROM Hotel WHERE HotelID = @id");

    if (hotel.recordset.length === 0) return res.status(404).json({ message: "Hotel not found" });

    const pics = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("SELECT * FROM HotelPics WHERE HotelID = @id");

    res.json({ ...hotel.recordset[0], images: pics.recordset });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/hotels
export const createHotel = async (req, res) => {
  const { name, location, checkinTime, checkoutTime, images = [] } = req.body;
  if (!name || !location) return res.status(400).json({ message: "Name and location required" });

  try {
    const pool = await getPool();
    const idRes = await pool.request().query("SELECT ISNULL(MAX(HotelID),0)+1 AS NextID FROM Hotel");
    const newId = idRes.recordset[0].NextID;

    await pool
      .request()
      .input("HotelID", sql.Int, newId)
      .input("Name", sql.VarChar, name)
      .input("Location", sql.VarChar, location)
      .input("CheckinTime", sql.VarChar, checkinTime || "14:00")
      .input("CheckoutTime", sql.VarChar, checkoutTime || "11:00")
      .query("INSERT INTO Hotel (HotelID, Name, Location, CheckinTime, CheckoutTime) VALUES (@HotelID, @Name, @Location, @CheckinTime, @CheckoutTime)");

    // Insert images
    for (let i = 0; i < images.length; i++) {
      const picIdRes = await pool.request().query("SELECT ISNULL(MAX(HotelPicsID),0)+1 AS NextID FROM HotelPics");
      await pool
        .request()
        .input("HotelPicsID", sql.Int, picIdRes.recordset[0].NextID)
        .input("HotelID", sql.Int, newId)
        .input("HotelPic", sql.VarChar(sql.MAX), images[i])
        .query("INSERT INTO HotelPics (HotelPicsID, HotelID, HotelPic) VALUES (@HotelPicsID, @HotelID, @HotelPic)");
    }

    res.status(201).json({ message: "Hotel created", hotelId: newId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/hotels/:id
export const updateHotel = async (req, res) => {
  const { name, location, checkinTime, checkoutTime } = req.body;
  try {
    const pool = await getPool();
    await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("Name", sql.VarChar, name)
      .input("Location", sql.VarChar, location)
      .input("CheckinTime", sql.VarChar, checkinTime)
      .input("CheckoutTime", sql.VarChar, checkoutTime)
      .query("UPDATE Hotel SET Name=@Name, Location=@Location, CheckinTime=@CheckinTime, CheckoutTime=@CheckoutTime WHERE HotelID=@id");

    res.json({ message: "Hotel updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/hotels/:id
export const deleteHotel = async (req, res) => {
  try {
    const pool = await getPool();
    await pool.request().input("id", sql.Int, req.params.id).query("DELETE FROM HotelPics WHERE HotelID=@id");
    await pool.request().input("id", sql.Int, req.params.id).query("DELETE FROM Hotel WHERE HotelID=@id");
    res.json({ message: "Hotel deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};












// POST /api/hotels/:hotelId/pictures
// Body: multipart/form-data  field name: "image"
export const uploadHotelPicture = async (req, res) => {
  const hotelId = req.params.hotelId;

  if (!req.file) return res.status(400).json({ message: "No image file provided" });

  try {
    // Upload buffer directly to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `rt-grace/hotels/${hotelId}`,
          transformation: [{ width: 1200, height: 800, crop: "fill", quality: "auto" }],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    // Save Cloudinary URL + public_id to DB
    const pool = await getPool();
    const idRes = await pool
      .request()
      .query("SELECT ISNULL(MAX(HotelPicsID),0)+1 AS NextID FROM HotelPics");
    const newId = idRes.recordset[0].NextID;

    await pool
      .request()
      .input("HotelPicsID", sql.Int, newId)
      .input("HotelID", sql.Int, hotelId)
      // Store full Cloudinary URL — public_id appended after | for deletion later
      .input("HotelPic", sql.VarChar(sql.MAX), `${result.secure_url}|${result.public_id}`)
      .query(
        "INSERT INTO HotelPics (HotelPicsID, HotelID, HotelPic) VALUES (@HotelPicsID, @HotelID, @HotelPic)"
      );

    res.status(201).json({
      message: "Image uploaded",
      picId: newId,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

// DELETE /api/hotels/pictures/:picId
export const deleteHotelPicture = async (req, res) => {
  const picId = req.params.picId;
  try {
    const pool = await getPool();

    // Get the pic record first to extract Cloudinary public_id
    const picRes = await pool
      .request()
      .input("id", sql.Int, picId)
      .query("SELECT HotelPic FROM HotelPics WHERE HotelPicsID = @id");

    if (picRes.recordset.length === 0)
      return res.status(404).json({ message: "Picture not found" });

    const picValue = picRes.recordset[0].HotelPic;

    // Extract public_id if stored as "url|public_id"
    if (picValue && picValue.includes("|")) {
      const publicId = picValue.split("|")[1];
      await cloudinary.uploader.destroy(publicId);
    }

    // Delete from DB
    await pool
      .request()
      .input("id", sql.Int, picId)
      .query("DELETE FROM HotelPics WHERE HotelPicsID = @id");

    res.json({ message: "Picture deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

// GET /api/hotels/:hotelId/pictures
export const getHotelPictures = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.hotelId)
      .query("SELECT HotelPicsID, HotelPic FROM HotelPics WHERE HotelID = @id ORDER BY HotelPicsID");

    // Parse url from "url|public_id" format
    const pics = result.recordset.map((p) => ({
      HotelPicsID: p.HotelPicsID,
      url: p.HotelPic?.includes("|") ? p.HotelPic.split("|")[0] : p.HotelPic,
    }));

    res.json(pics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


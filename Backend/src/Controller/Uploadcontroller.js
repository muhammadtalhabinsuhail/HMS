import dotenv from "dotenv";
dotenv.config();

import { getPool } from "../config/db.js";
import sql from "mssql";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

                    folder: "owner_id_images",
                    resource_type: "image",
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
// export const deleteHotelPicture = async (req, res) => {
//     const picId = req.params.picId;
//     try {
//         const pool = await getPool();

//         // Get the pic record first to extract Cloudinary public_id
//         const picRes = await pool
//             .request()
//             .input("id", sql.Int, picId)
//             .query("SELECT HotelPic FROM HotelPics WHERE HotelPicsID = @id");

//         if (picRes.recordset.length === 0)
//             return res.status(404).json({ message: "Picture not found" });

//         const picValue = picRes.recordset[0].HotelPic;

//         // Extract public_id if stored as "url|public_id"
//         if (picValue && picValue.includes("|")) {
//             const publicId = picValue.split("|")[1];
//             await cloudinary.uploader.destroy(publicId);
//         }

//         // Delete from DB
//         await pool
//             .request()
//             .input("id", sql.Int, picId)
//             .query("DELETE FROM HotelPics WHERE HotelPicsID = @id");

//         res.json({ message: "Picture deleted" });
//     } catch (err) {
//         console.error("Delete error:", err);
//         res.status(500).json({ message: "Delete failed", error: err.message });
//     }
// };

export const deleteHotelPicture = async (req, res) => {
    const picId = req.params.picId;

    try {
        const pool = await getPool();

        const picRes = await pool
            .request()
            .input("id", sql.Int, picId)
            .query("SELECT HotelPic FROM HotelPics WHERE HotelPicsID = @id");

        if (picRes.recordset.length === 0) {
            return res.status(404).json({ message: "Picture not found" });
        }

        const picValue = picRes.recordset[0].HotelPic;

        console.log("DB Value:", picValue);

        // DELETE FROM CLOUDINARY
        if (picValue && picValue.includes("|")) {

            const publicId = picValue.split("|")[1];

            console.log("Public ID:", publicId);

            try {
                const cloudinaryRes = await cloudinary.uploader.destroy(publicId);

                console.log("Cloudinary Response:", cloudinaryRes);

            } catch (cloudErr) {
                console.log("Cloudinary Delete Error:", cloudErr);
            }
        }

        // DELETE FROM DATABASE
        await pool
            .request()
            .input("id", sql.Int, picId)
            .query("DELETE FROM HotelPics WHERE HotelPicsID = @id");

        res.json({ message: "Picture deleted successfully" });

    } catch (err) {

        console.error("Delete error:", err);

        res.status(500).json({
            message: "Delete failed",
            error: err.message
        });
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


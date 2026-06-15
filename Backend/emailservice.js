// // // import nodemailer from "nodemailer";

// // // // ── Transporter ─────────────────────────────────────────────
// // // const transporter = nodemailer.createTransport({
// // //   host: process.env.SMTP_HOST,
// // //   port: parseInt(process.env.SMTP_PORT) || 587,
// // //   secure: process.env.SMTP_SECURE === "true", // true for port 465
// // //   auth: {
// // //     user: process.env.SMTP_USER,
// // //     pass: process.env.SMTP_PASS,
// // //   },
// // // });

// // // // ── Helper: format date nicely ───────────────────────────────
// // // const fmtDate = (d) =>
// // //   new Date(d).toLocaleDateString("en-GB", {
// // //     weekday: "short",
// // //     day: "numeric",
// // //     month: "long",
// // //     year: "numeric",
// // //   });

// // // // ── Helper: night count ──────────────────────────────────────
// // // const nightCount = (checkIn, checkOut) =>
// // //   Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));

// // // // ── HTML Email Template ──────────────────────────────────────
// // // const buildBookingEmailHtml = ({ booking, guestName, guestEmail, guestPhone, hotelName, hotelLocation, rooms, grandTotal, bookingId, checkIn, checkOut, adults, children }) => {
// // //   const nights = nightCount(checkIn, checkOut);
// // //   const perNight = (grandTotal / nights).toFixed(2);

// // //   return `
// // // <!DOCTYPE html>
// // // <html lang="en">
// // // <head>
// // //   <meta charset="UTF-8" />
// // //   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
// // //   <title>New Booking — RT Grace Hotel</title>
// // // </head>
// // // <body style="margin:0;padding:0;background-color:#f5f0eb;font-family:'Segoe UI',Arial,sans-serif;">

// // //   <!-- Wrapper -->
// // //   <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0eb;padding:40px 0;">
// // //     <tr>
// // //       <td align="center">
// // //         <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">

// // //           <!-- ── HEADER ── -->
// // //           <tr>
// // //             <td style="background-color:#6b3410;border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
// // //               <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:5px;color:#d4a574;text-transform:uppercase;font-weight:400;">RT Grace Hotel</p>
// // //               <h1 style="margin:0;font-size:28px;font-weight:300;color:#ffffff;line-height:1.3;">New Booking Received</h1>
// // //               <p style="margin:10px 0 0 0;font-size:13px;color:rgba(255,255,255,0.65);font-weight:300;">
// // //                 A guest has confirmed a reservation
// // //               </p>
// // //             </td>
// // //           </tr>

// // //           <!-- ── BOOKING ID BANNER ── -->
// // //           <tr>
// // //             <td style="background-color:#8b4513;padding:14px 40px;text-align:center;">
// // //               <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.7);letter-spacing:3px;text-transform:uppercase;">Booking Reference</p>
// // //               <p style="margin:4px 0 0 0;font-size:22px;font-weight:600;color:#ffffff;letter-spacing:2px;">#${String(bookingId).padStart(6, "0")}</p>
// // //             </td>
// // //           </tr>

// // //           <!-- ── MAIN CARD ── -->
// // //           <tr>
// // //             <td style="background-color:#ffffff;padding:36px 40px;">

// // //               <!-- Stay summary strip -->
// // //               <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fdf8f3;border:1px solid #e8d5c4;border-radius:12px;margin-bottom:28px;">
// // //                 <tr>
// // //                   <td style="padding:20px 24px;border-right:1px solid #e8d5c4;text-align:center;width:33%;">
// // //                     <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;">Check-in</p>
// // //                     <p style="margin:0;font-size:15px;font-weight:600;color:#2d1a0e;">${fmtDate(checkIn)}</p>
// // //                     <p style="margin:4px 0 0 0;font-size:11px;color:#9a7a6a;">From 14:00</p>
// // //                   </td>
// // //                   <td style="padding:20px 24px;border-right:1px solid #e8d5c4;text-align:center;width:33%;">
// // //                     <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;">Duration</p>
// // //                     <p style="margin:0;font-size:24px;font-weight:300;color:#8b4513;">${nights}</p>
// // //                     <p style="margin:0;font-size:11px;color:#9a7a6a;">night${nights !== 1 ? "s" : ""}</p>
// // //                   </td>
// // //                   <td style="padding:20px 24px;text-align:center;width:33%;">
// // //                     <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;">Check-out</p>
// // //                     <p style="margin:0;font-size:15px;font-weight:600;color:#2d1a0e;">${fmtDate(checkOut)}</p>
// // //                     <p style="margin:4px 0 0 0;font-size:11px;color:#9a7a6a;">By 11:00</p>
// // //                   </td>
// // //                 </tr>
// // //               </table>

// // //               <!-- Section: Property -->
// // //               <p style="margin:0 0 12px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;border-bottom:1px solid #f0e8e0;padding-bottom:8px;">Property</p>
// // //               <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
// // //                 <tr>
// // //                   <td style="padding:4px 0;">
// // //                     <p style="margin:0;font-size:18px;font-weight:600;color:#2d1a0e;">${hotelName}</p>
// // //                     <p style="margin:4px 0 0 0;font-size:13px;color:#9a7a6a;">📍 ${hotelLocation}</p>
// // //                   </td>
// // //                 </tr>
// // //               </table>

// // //               <!-- Section: Rooms -->
// // //               <p style="margin:0 0 12px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;border-bottom:1px solid #f0e8e0;padding-bottom:8px;">Rooms Booked</p>
// // //               <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
// // //                 ${rooms.map((room, i) => `
// // //                 <tr>
// // //                   <td style="padding:8px 0;${i < rooms.length - 1 ? "border-bottom:1px solid #f5ede6;" : ""}">
// // //                     <table width="100%" cellpadding="0" cellspacing="0">
// // //                       <tr>
// // //                         <td>
// // //                           <p style="margin:0;font-size:14px;font-weight:500;color:#2d1a0e;">🛏️ ${room.RoomName}</p>
// // //                         </td>
// // //                         <td align="right">
// // //                           <p style="margin:0;font-size:13px;color:#8b4513;font-weight:600;">$${parseFloat(room.Price).toFixed(2)}<span style="font-weight:400;color:#9a7a6a;font-size:11px;">/night</span></p>
// // //                         </td>
// // //                       </tr>
// // //                     </table>
// // //                   </td>
// // //                 </tr>`).join("")}
// // //               </table>

// // //               <!-- Section: Guest -->
// // //               <p style="margin:0 0 12px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;border-bottom:1px solid #f0e8e0;padding-bottom:8px;">Guest Details</p>
// // //               <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
// // //                 <tr>
// // //                   <td style="padding:4px 0;width:50%;vertical-align:top;">
// // //                     <p style="margin:0 0 2px 0;font-size:11px;color:#9a7a6a;text-transform:uppercase;letter-spacing:1px;">Full Name</p>
// // //                     <p style="margin:0;font-size:14px;font-weight:500;color:#2d1a0e;">${guestName}</p>
// // //                   </td>
// // //                   <td style="padding:4px 0;width:50%;vertical-align:top;">
// // //                     <p style="margin:0 0 2px 0;font-size:11px;color:#9a7a6a;text-transform:uppercase;letter-spacing:1px;">Email</p>
// // //                     <p style="margin:0;font-size:14px;font-weight:500;color:#2d1a0e;">${guestEmail}</p>
// // //                   </td>
// // //                 </tr>
// // //                 <tr>
// // //                   <td style="padding:12px 0 4px 0;vertical-align:top;">
// // //                     <p style="margin:0 0 2px 0;font-size:11px;color:#9a7a6a;text-transform:uppercase;letter-spacing:1px;">Phone</p>
// // //                     <p style="margin:0;font-size:14px;font-weight:500;color:#2d1a0e;">${guestPhone || "Not provided"}</p>
// // //                   </td>
// // //                   <td style="padding:12px 0 4px 0;vertical-align:top;">
// // //                     <p style="margin:0 0 2px 0;font-size:11px;color:#9a7a6a;text-transform:uppercase;letter-spacing:1px;">Guests</p>
// // //                     <p style="margin:0;font-size:14px;font-weight:500;color:#2d1a0e;">
// // //                       ${adults || 1} Adult${(adults || 1) !== 1 ? "s" : ""}${children > 0 ? `, ${children} Child${children !== 1 ? "ren" : ""}` : ""}
// // //                     </p>
// // //                   </td>
// // //                 </tr>
// // //               </table>

// // //               <!-- Pricing Summary -->
// // //               <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fdf8f3;border:1px solid #e8d5c4;border-radius:12px;overflow:hidden;">
// // //                 <tr>
// // //                   <td style="padding:16px 20px;border-bottom:1px solid #e8d5c4;">
// // //                     <table width="100%" cellpadding="0" cellspacing="0">
// // //                       <tr>
// // //                         <td><p style="margin:0;font-size:13px;color:#6b5040;">Subtotal per night</p></td>
// // //                         <td align="right"><p style="margin:0;font-size:13px;color:#2d1a0e;font-weight:500;">$${perNight}</p></td>
// // //                       </tr>
// // //                     </table>
// // //                   </td>
// // //                 </tr>
// // //                 <tr>
// // //                   <td style="padding:16px 20px;border-bottom:1px solid #e8d5c4;">
// // //                     <table width="100%" cellpadding="0" cellspacing="0">
// // //                       <tr>
// // //                         <td><p style="margin:0;font-size:13px;color:#6b5040;">Duration</p></td>
// // //                         <td align="right"><p style="margin:0;font-size:13px;color:#2d1a0e;font-weight:500;">${nights} night${nights !== 1 ? "s" : ""}</p></td>
// // //                       </tr>
// // //                     </table>
// // //                   </td>
// // //                 </tr>
// // //                 <tr>
// // //                   <td style="padding:18px 20px;background-color:#8b4513;">
// // //                     <table width="100%" cellpadding="0" cellspacing="0">
// // //                       <tr>
// // //                         <td><p style="margin:0;font-size:14px;color:rgba(255,255,255,0.85);font-weight:500;letter-spacing:1px;">GRAND TOTAL</p></td>
// // //                         <td align="right"><p style="margin:0;font-size:22px;color:#ffffff;font-weight:700;">$${parseFloat(grandTotal).toFixed(2)}</p></td>
// // //                       </tr>
// // //                     </table>
// // //                   </td>
// // //                 </tr>
// // //               </table>

// // //             </td>
// // //           </tr>

// // //           <!-- ── CTA ── -->
// // //           <tr>
// // //             <td style="background-color:#fdf8f3;border:1px solid #e8d5c4;border-top:none;padding:24px 40px;text-align:center;">
// // //               <p style="margin:0 0 16px 0;font-size:13px;color:#6b5040;">Review and manage this booking in the admin panel</p>
// // //               <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}/admin/bookings"
// // //                 style="display:inline-block;background-color:#8b4513;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:12px 32px;border-radius:8px;letter-spacing:1px;">
// // //                 View Booking →
// // //               </a>
// // //             </td>
// // //           </tr>

// // //           <!-- ── FOOTER ── -->
// // //           <tr>
// // //             <td style="background-color:#2d1a0e;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
// // //               <p style="margin:0 0 4px 0;font-size:13px;color:rgba(255,255,255,0.5);font-weight:300;">
// // //                 RT Grace Hotel Management System
// // //               </p>
// // //               <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.3);">
// // //                 This is an automated notification. Please do not reply to this email.
// // //               </p>
// // //             </td>
// // //           </tr>

// // //         </table>
// // //       </td>
// // //     </tr>
// // //   </table>

// // // </body>
// // // </html>`;
// // // };

// // // // ── Main export: send booking notification to all admins ─────
// // // export const sendBookingNotification = async ({
// // //   adminEmails,
// // //   bookingId,
// // //   guestName,
// // //   guestEmail,
// // //   guestPhone,
// // //   hotelName,
// // //   hotelLocation,
// // //   rooms,
// // //   grandTotal,
// // //   checkIn,
// // //   checkOut,
// // //   adults,
// // //   children,
// // // }) => {
// // //   if (!adminEmails || adminEmails.length === 0) return;

// // //   const html = buildBookingEmailHtml({
// // //     bookingId,
// // //     guestName,
// // //     guestEmail,
// // //     guestPhone,
// // //     hotelName,
// // //     hotelLocation,
// // //     rooms,
// // //     grandTotal,
// // //     checkIn,
// // //     checkOut,
// // //     adults,
// // //     children,
// // //   });

// // //   const nights = nightCount(checkIn, checkOut);

// // //   await transporter.sendMail({
// // //     from: `"RT Grace Hotel" <${process.env.SMTP_USER}>`,
// // //     to: adminEmails.join(", "),
// // //     subject: `🏨 New Booking #${String(bookingId).padStart(6, "0")} — ${guestName} · ${hotelName} · ${nights} night${nights !== 1 ? "s" : ""}`,
// // //     html,
// // //   });
// // // };



// // import nodemailer from "nodemailer";

// // // Lazy transporter - created on first use so dotenv has already run
// // let _transporter = null;

// // const getTransporter = () => {
// //     if (_transporter) return _transporter;

// //     const host = process.env.SMTP_HOST;
// //     const user = process.env.SMTP_USER;
// //     const pass = process.env.SMTP_PASS;

// //     if (!host || !user || !pass) {
// //         throw new Error(
// //             `SMTP not configured. Check SMTP_HOST, SMTP_USER, SMTP_PASS in .env\n` +
// //             `HOST: ${host || "MISSING"} | USER: ${user || "MISSING"} | PASS: ${pass ? "set" : "MISSING"}`
// //         );
// //     }

// //     _transporter = nodemailer.createTransport({
// //         host,
// //         port: parseInt(process.env.SMTP_PORT) || 587,
// //         secure: process.env.SMTP_SECURE === "true",
// //         auth: { user, pass },
// //     });

// //     return _transporter;
// // };

// // // Helper: format date nicely
// // const fmtDate = (d) =>
// //     new Date(d).toLocaleDateString("en-GB", {
// //         weekday: "short",
// //         day: "numeric",
// //         month: "long",
// //         year: "numeric",
// //     });

// // // Helper: night count
// // const nightCount = (checkIn, checkOut) =>
// //     Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));

// // // HTML Email Template
// // const buildBookingEmailHtml = ({
// //     bookingId, guestName, guestEmail, guestPhone,
// //     hotelName, hotelLocation, rooms, grandTotal,
// //     checkIn, checkOut, adults, children,
// // }) => {
// //     const nights = nightCount(checkIn, checkOut);
// //     const perNight = (grandTotal / nights).toFixed(2);

// //     return `
// // <!DOCTYPE html>
// // <html lang="en">
// // <head>
// //   <meta charset="UTF-8" />
// //   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
// //   <title>New Booking - RT Grace Hotel</title>
// // </head>
// // <body style="margin:0;padding:0;background-color:#f5f0eb;font-family:'Segoe UI',Arial,sans-serif;">
// //   <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0eb;padding:40px 0;">
// //     <tr>
// //       <td align="center">
// //         <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">

// //           <!-- HEADER -->
// //           <tr>
// //             <td style="background-color:#6b3410;border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
// //               <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:5px;color:#d4a574;text-transform:uppercase;">RT Grace Hotel</p>
// //               <h1 style="margin:0;font-size:28px;font-weight:300;color:#ffffff;">New Booking Received</h1>
// //               <p style="margin:10px 0 0 0;font-size:13px;color:rgba(255,255,255,0.65);">A guest has confirmed a reservation</p>
// //             </td>
// //           </tr>

// //           <!-- BOOKING ID BANNER -->
// //           <tr>
// //             <td style="background-color:#8b4513;padding:14px 40px;text-align:center;">
// //               <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.7);letter-spacing:3px;text-transform:uppercase;">Booking Reference</p>
// //               <p style="margin:4px 0 0 0;font-size:22px;font-weight:600;color:#ffffff;letter-spacing:2px;">#\${String(bookingId).padStart(6, "0")}</p>
// //             </td>
// //           </tr>

// //           <!-- MAIN CARD -->
// //           <tr>
// //             <td style="background-color:#ffffff;padding:36px 40px;">

// //               <!-- Stay strip -->
// //               <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fdf8f3;border:1px solid #e8d5c4;border-radius:12px;margin-bottom:28px;">
// //                 <tr>
// //                   <td style="padding:20px 24px;border-right:1px solid #e8d5c4;text-align:center;width:33%;">
// //                     <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;">Check-in</p>
// //                     <p style="margin:0;font-size:15px;font-weight:600;color:#2d1a0e;">\${fmtDate(checkIn)}</p>
// //                     <p style="margin:4px 0 0 0;font-size:11px;color:#9a7a6a;">From 14:00</p>
// //                   </td>
// //                   <td style="padding:20px 24px;border-right:1px solid #e8d5c4;text-align:center;width:33%;">
// //                     <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;">Duration</p>
// //                     <p style="margin:0;font-size:24px;font-weight:300;color:#8b4513;">\${nights}</p>
// //                     <p style="margin:0;font-size:11px;color:#9a7a6a;">night\${nights !== 1 ? "s" : ""}</p>
// //                   </td>
// //                   <td style="padding:20px 24px;text-align:center;width:33%;">
// //                     <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;">Check-out</p>
// //                     <p style="margin:0;font-size:15px;font-weight:600;color:#2d1a0e;">\${fmtDate(checkOut)}</p>
// //                     <p style="margin:4px 0 0 0;font-size:11px;color:#9a7a6a;">By 11:00</p>
// //                   </td>
// //                 </tr>
// //               </table>

// //               <!-- Property -->
// //               <p style="margin:0 0 12px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;border-bottom:1px solid #f0e8e0;padding-bottom:8px;">Property</p>
// //               <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
// //                 <tr>
// //                   <td style="padding:4px 0;">
// //                     <p style="margin:0;font-size:18px;font-weight:600;color:#2d1a0e;">\${hotelName}</p>
// //                     <p style="margin:4px 0 0 0;font-size:13px;color:#9a7a6a;">Location: \${hotelLocation}</p>
// //                   </td>
// //                 </tr>
// //               </table>

// //               <!-- Rooms -->
// //               <p style="margin:0 0 12px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;border-bottom:1px solid #f0e8e0;padding-bottom:8px;">Rooms Booked</p>
// //            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
// //   ${rooms.map((room, i) => `
// //   <tr>
// //     <td style="padding:8px 0;${i < rooms.length - 1 ? "border-bottom:1px solid #f5ede6;" : ""}">
// //       <table width="100%" cellpadding="0" cellspacing="0">
// //         <tr>
// //           <td>
// //             <p style="margin:0;font-size:14px;font-weight:500;color:#2d1a0e;">
// //               Room: ${room.RoomName}
// //             </p>
// //           </td>

// //           <td align="right">
// //             <p style="margin:0;font-size:13px;color:#8b4513;font-weight:600;">
// //               $${parseFloat(room.Price).toFixed(2)}
// //               <span style="font-weight:400;color:#9a7a6a;font-size:11px;">
// //                 /night
// //               </span>
// //             </p>
// //           </td>

// //         </tr>
// //       </table>
// //     </td>
// //   </tr>
// //   `).join("")}
// // </table>

// //               <!-- Guest -->
// //               <p style="margin:0 0 12px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;border-bottom:1px solid #f0e8e0;padding-bottom:8px;">Guest Details</p>
// //               <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
// //                 <tr>
// //                   <td style="padding:4px 0;width:50%;vertical-align:top;">
// //                     <p style="margin:0 0 2px 0;font-size:11px;color:#9a7a6a;text-transform:uppercase;letter-spacing:1px;">Full Name</p>
// //                     <p style="margin:0;font-size:14px;font-weight:500;color:#2d1a0e;">\${guestName}</p>
// //                   </td>
// //                   <td style="padding:4px 0;width:50%;vertical-align:top;">
// //                     <p style="margin:0 0 2px 0;font-size:11px;color:#9a7a6a;text-transform:uppercase;letter-spacing:1px;">Email</p>
// //                     <p style="margin:0;font-size:14px;font-weight:500;color:#2d1a0e;">\${guestEmail}</p>
// //                   </td>
// //                 </tr>
// //                 <tr>
// //                   <td style="padding:12px 0 4px 0;vertical-align:top;">
// //                     <p style="margin:0 0 2px 0;font-size:11px;color:#9a7a6a;text-transform:uppercase;letter-spacing:1px;">Phone</p>
// //                     <p style="margin:0;font-size:14px;font-weight:500;color:#2d1a0e;">\${guestPhone || "Not provided"}</p>
// //                   </td>
// //                   <td style="padding:12px 0 4px 0;vertical-align:top;">
// //                     <p style="margin:0 0 2px 0;font-size:11px;color:#9a7a6a;text-transform:uppercase;letter-spacing:1px;">Guests</p>
// //                    <p style="margin:0;font-size:14px;font-weight:500;color:#2d1a0e;">
// //   ${adults} Adult${adults !== 1 ? "s" : ""}
// //   ${children > 0 ? `, ${children} Child${children !== 1 ? "ren" : ""}` : ""}
// // </p>
// //                   </td>
// //                 </tr>
// //               </table>

// //               <!-- Pricing -->
// //               <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fdf8f3;border:1px solid #e8d5c4;border-radius:12px;overflow:hidden;">
// //                 <tr>
// //                   <td style="padding:16px 20px;border-bottom:1px solid #e8d5c4;">
// //                     <table width="100%" cellpadding="0" cellspacing="0">
// //                       <tr>
// //                         <td><p style="margin:0;font-size:13px;color:#6b5040;">Subtotal per night</p></td>
// //                         <td align="right"><p style="margin:0;font-size:13px;color:#2d1a0e;font-weight:500;">$\${perNight}</p></td>
// //                       </tr>
// //                     </table>
// //                   </td>
// //                 </tr>
// //                 <tr>
// //                   <td style="padding:16px 20px;border-bottom:1px solid #e8d5c4;">
// //                     <table width="100%" cellpadding="0" cellspacing="0">
// //                       <tr>
// //                         <td><p style="margin:0;font-size:13px;color:#6b5040;">Duration</p></td>
// //                         <td align="right"><p style="margin:0;font-size:13px;color:#2d1a0e;font-weight:500;">\${nights} night\${nights !== 1 ? "s" : ""}</p></td>
// //                       </tr>
// //                     </table>
// //                   </td>
// //                 </tr>
// //                 <tr>
// //                   <td style="padding:18px 20px;background-color:#8b4513;">
// //                     <table width="100%" cellpadding="0" cellspacing="0">
// //                       <tr>
// //                         <td><p style="margin:0;font-size:14px;color:rgba(255,255,255,0.85);font-weight:500;letter-spacing:1px;">GRAND TOTAL</p></td>
// //                         <td align="right"><p style="margin:0;font-size:22px;color:#ffffff;font-weight:700;">$\${parseFloat(grandTotal).toFixed(2)}</p></td>
// //                       </tr>
// //                     </table>
// //                   </td>
// //                 </tr>
// //               </table>

// //             </td>
// //           </tr>

// //           <!-- CTA -->
// //           <tr>
// //             <td style="background-color:#fdf8f3;border:1px solid #e8d5c4;border-top:none;padding:24px 40px;text-align:center;">
// //               <p style="margin:0 0 16px 0;font-size:13px;color:#6b5040;">Review and manage this booking in the admin panel</p>
// //               <a href="\${process.env.FRONTEND_URL || "http://localhost:3000"}/admin/bookings"
// //                 style="display:inline-block;background-color:#8b4513;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:12px 32px;border-radius:8px;letter-spacing:1px;">
// //                 View Booking
// //               </a>
// //             </td>
// //           </tr>

// //           <!-- FOOTER -->
// //           <tr>
// //             <td style="background-color:#2d1a0e;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
// //               <p style="margin:0 0 4px 0;font-size:13px;color:rgba(255,255,255,0.5);">RT Grace Hotel Management System</p>
// //               <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.3);">This is an automated notification. Please do not reply.</p>
// //             </td>
// //           </tr>

// //         </table>
// //       </td>
// //     </tr>
// //   </table>
// // </body>
// // </html>`;
// // };

// // // Main export: notify all admins on new booking
// // export const sendBookingNotification = async ({
// //     adminEmails,
// //     bookingId,
// //     guestName,
// //     guestEmail,
// //     guestPhone,
// //     hotelName,
// //     hotelLocation,
// //     rooms,
// //     grandTotal,
// //     checkIn,
// //     checkOut,
// //     adults,
// //     children,
// // }) => {
// //     if (!adminEmails || adminEmails.length === 0) {
// //         console.warn("No admin emails found - skipping notification");
// //         return;
// //     }

// //     const transporter = getTransporter(); // lazy - reads env vars now, not at import
// //     const html = buildBookingEmailHtml({
// //         bookingId, guestName, guestEmail, guestPhone,
// //         hotelName, hotelLocation, rooms, grandTotal,
// //         checkIn, checkOut, adults, children,
// //     });

// //     const nights = nightCount(checkIn, checkOut);

// //     await transporter.sendMail({
// //         from: `"RT Grace Hotel" <\${process.env.SMTP_USER}>`,
// //         to: adminEmails.join(", "),
// //         subject: `New Booking #\${String(bookingId).padStart(6, "0")} - \${guestName} - \${hotelName} - \${nights} night\${nights !== 1 ? "s" : ""}`,
// //         html,
// //     });

// //     console.log(`Email sent to \${adminEmails.length} admin(s) for booking #\${bookingId}`);
// // };


// import nodemailer from "nodemailer";

// // Lazy transporter - created on first use so dotenv has already run
// let _transporter = null;

// const getTransporter = () => {
//     if (_transporter) return _transporter;

//     const host = process.env.SMTP_HOST;
//     const user = process.env.SMTP_USER;
//     const pass = process.env.SMTP_PASS;

//     if (!host || !user || !pass) {
//         throw new Error(
//             `SMTP not configured. Check SMTP_HOST, SMTP_USER, SMTP_PASS in .env\n` +
//             `HOST: ${host || "MISSING"} | USER: ${user || "MISSING"} | PASS: ${pass ? "set" : "MISSING"}`
//         );
//     }

//     _transporter = nodemailer.createTransport({
//         host,
//         port: parseInt(process.env.SMTP_PORT) || 587,
//         secure: process.env.SMTP_SECURE === "true",
//         auth: { user, pass },
//     });

//     return _transporter;
// };

// // Helper: format date nicely
// const fmtDate = (d) =>
//     new Date(d).toLocaleDateString("en-GB", {
//         weekday: "short",
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//     });

// // Helper: night count
// const nightCount = (checkIn, checkOut) =>
//     Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));

// // HTML Email Template
// const buildBookingEmailHtml = ({
//     bookingId, guestName, guestEmail, guestPhone,
//     hotelName, hotelLocation, rooms, grandTotal,
//     checkIn, checkOut, adults, children,
// }) => {
//     const nights = nightCount(checkIn, checkOut);
//     const perNight = (grandTotal / nights).toFixed(2);

//     return `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//   <title>New Booking - RT Grace Hotel</title>
// </head>
// <body style="margin:0;padding:0;background-color:#f5f0eb;font-family:'Segoe UI',Arial,sans-serif;">
//   <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0eb;padding:40px 0;">
//     <tr>
//       <td align="center">
//         <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">

//           <!-- HEADER -->
//           <tr>
//             <td style="background-color:#6b3410;border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
//               <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:5px;color:#d4a574;text-transform:uppercase;">RT Grace Hotel</p>
//               <h1 style="margin:0;font-size:28px;font-weight:300;color:#ffffff;">New Booking Received</h1>
//               <p style="margin:10px 0 0 0;font-size:13px;color:rgba(255,255,255,0.65);">A guest has confirmed a reservation</p>
//             </td>
//           </tr>

//           <!-- BOOKING ID BANNER -->
//           <tr>
//             <td style="background-color:#8b4513;padding:14px 40px;text-align:center;">
//               <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.7);letter-spacing:3px;text-transform:uppercase;">Booking Reference</p>
//               <p style="margin:4px 0 0 0;font-size:22px;font-weight:600;color:#ffffff;letter-spacing:2px;">#\${String(bookingId).padStart(6, "0")}</p>
//             </td>
//           </tr>

//           <!-- MAIN CARD -->
//           <tr>
//             <td style="background-color:#ffffff;padding:36px 40px;">

//               <!-- Stay strip -->
//               <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fdf8f3;border:1px solid #e8d5c4;border-radius:12px;margin-bottom:28px;">
//                 <tr>
//                   <td style="padding:20px 24px;border-right:1px solid #e8d5c4;text-align:center;width:33%;">
//                     <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;">Check-in</p>
//                     <p style="margin:0;font-size:15px;font-weight:600;color:#2d1a0e;">\${fmtDate(checkIn)}</p>
//                     <p style="margin:4px 0 0 0;font-size:11px;color:#9a7a6a;">From 14:00</p>
//                   </td>
//                   <td style="padding:20px 24px;border-right:1px solid #e8d5c4;text-align:center;width:33%;">
//                     <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;">Duration</p>
//                     <p style="margin:0;font-size:24px;font-weight:300;color:#8b4513;">\${nights}</p>
//                     <p style="margin:0;font-size:11px;color:#9a7a6a;">night\${nights !== 1 ? "s" : ""}</p>
//                   </td>
//                   <td style="padding:20px 24px;text-align:center;width:33%;">
//                     <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;">Check-out</p>
//                     <p style="margin:0;font-size:15px;font-weight:600;color:#2d1a0e;">\${fmtDate(checkOut)}</p>
//                     <p style="margin:4px 0 0 0;font-size:11px;color:#9a7a6a;">By 11:00</p>
//                   </td>
//                 </tr>
//               </table>

//               <!-- Property -->
//               <p style="margin:0 0 12px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;border-bottom:1px solid #f0e8e0;padding-bottom:8px;">Property</p>
//               <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
//                 <tr>
//                   <td style="padding:4px 0;">
//                     <p style="margin:0;font-size:18px;font-weight:600;color:#2d1a0e;">\${hotelName}</p>
//                     <p style="margin:4px 0 0 0;font-size:13px;color:#9a7a6a;">Location: \${hotelLocation}</p>
//                   </td>
//                 </tr>
//               </table>

//               <!-- Rooms -->
//               <p style="margin:0 0 12px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;border-bottom:1px solid #f0e8e0;padding-bottom:8px;">Rooms Booked</p>
//              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
//   ${rooms.map((room, i) => `
//     <tr>
//       <td style="padding:8px 0;${i < rooms.length - 1 ? 'border-bottom:1px solid #f5ede6;' : ''}">
        
//         <table width="100%" cellpadding="0" cellspacing="0">
//           <tr>

//             <td>
//               <p style="margin:0;font-size:14px;font-weight:500;color:#2d1a0e;">
//                 Room: ${room.RoomName}
//               </p>
//             </td>

//             <td align="right">
//               <p style="margin:0;font-size:13px;color:#8b4513;font-weight:600;">
//                 $${parseFloat(room.Price).toFixed(2)}
//                 <span style="font-weight:400;color:#9a7a6a;font-size:11px;">
//                   /night
//                 </span>
//               </p>
//             </td>

//           </tr>
//         </table>

//       </td>
//     </tr>
//   `).join("")}
// </table>

//               <!-- Guest -->
//               <p style="margin:0 0 12px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;border-bottom:1px solid #f0e8e0;padding-bottom:8px;">Guest Details</p>
//               <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
//                 <tr>
//                   <td style="padding:4px 0;width:50%;vertical-align:top;">
//                     <p style="margin:0 0 2px 0;font-size:11px;color:#9a7a6a;text-transform:uppercase;letter-spacing:1px;">Full Name</p>
//                     <p style="margin:0;font-size:14px;font-weight:500;color:#2d1a0e;">\${guestName}</p>
//                   </td>
//                   <td style="padding:4px 0;width:50%;vertical-align:top;">
//                     <p style="margin:0 0 2px 0;font-size:11px;color:#9a7a6a;text-transform:uppercase;letter-spacing:1px;">Email</p>
//                     <p style="margin:0;font-size:14px;font-weight:500;color:#2d1a0e;">\${guestEmail}</p>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style="padding:12px 0 4px 0;vertical-align:top;">
//                     <p style="margin:0 0 2px 0;font-size:11px;color:#9a7a6a;text-transform:uppercase;letter-spacing:1px;">Phone</p>
//                     <p style="margin:0;font-size:14px;font-weight:500;color:#2d1a0e;">\${guestPhone || "Not provided"}</p>
//                   </td>
//                   <td style="padding:12px 0 4px 0;vertical-align:top;">
//                     <p style="margin:0 0 2px 0;font-size:11px;color:#9a7a6a;text-transform:uppercase;letter-spacing:1px;">Guests</p>
//                     <p style="margin:0;font-size:14px;font-weight:500;color:#2d1a0e;">

//   ${adults} Adult${adults !== 1 ? "s" : ""}
//   ${children > 0 ? `, ${children} Child${children !== 1 ? "ren" : ""}` : ""}
//                    </p>
//                   </td>
//                 </tr>
//               </table>

//               <!-- Pricing -->
//               <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fdf8f3;border:1px solid #e8d5c4;border-radius:12px;overflow:hidden;">
//                 <tr>
//                   <td style="padding:16px 20px;border-bottom:1px solid #e8d5c4;">
//                     <table width="100%" cellpadding="0" cellspacing="0">
//                       <tr>
//                         <td><p style="margin:0;font-size:13px;color:#6b5040;">Subtotal per night</p></td>
//                         <td align="right"><p style="margin:0;font-size:13px;color:#2d1a0e;font-weight:500;">$\${perNight}</p></td>
//                       </tr>
//                     </table>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style="padding:16px 20px;border-bottom:1px solid #e8d5c4;">
//                     <table width="100%" cellpadding="0" cellspacing="0">
//                       <tr>
//                         <td><p style="margin:0;font-size:13px;color:#6b5040;">Duration</p></td>
//                         <td align="right"><p style="margin:0;font-size:13px;color:#2d1a0e;font-weight:500;">\${nights} night\${nights !== 1 ? "s" : ""}</p></td>
//                       </tr>
//                     </table>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style="padding:18px 20px;background-color:#8b4513;">
//                     <table width="100%" cellpadding="0" cellspacing="0">
//                       <tr>
//                         <td><p style="margin:0;font-size:14px;color:rgba(255,255,255,0.85);font-weight:500;letter-spacing:1px;">GRAND TOTAL</p></td>
//                         <td align="right"><p style="margin:0;font-size:22px;color:#ffffff;font-weight:700;">$\${parseFloat(grandTotal).toFixed(2)}</p></td>
//                       </tr>
//                     </table>
//                   </td>
//                 </tr>
//               </table>

//             </td>
//           </tr>

//           <!-- CTA -->
//           <tr>
//             <td style="background-color:#fdf8f3;border:1px solid #e8d5c4;border-top:none;padding:24px 40px;text-align:center;">
//               <p style="margin:0 0 16px 0;font-size:13px;color:#6b5040;">Review and manage this booking in the admin panel</p>
//               <a href="\${process.env.FRONTEND_URL || "http://localhost:3000"}/admin/bookings"
//                 style="display:inline-block;background-color:#8b4513;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:12px 32px;border-radius:8px;letter-spacing:1px;">
//                 View Booking
//               </a>
//             </td>
//           </tr>

//           <!-- FOOTER -->
//           <tr>
//             <td style="background-color:#2d1a0e;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
//               <p style="margin:0 0 4px 0;font-size:13px;color:rgba(255,255,255,0.5);">RT Grace Hotel Management System</p>
//               <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.3);">This is an automated notification. Please do not reply.</p>
//             </td>
//           </tr>

//         </table>
//       </td>
//     </tr>
//   </table>
// </body>
// </html>`;
// };

// // Main export: notify all admins on new booking
// export const sendBookingNotification = async ({
//     adminEmails,
//     bookingId,
//     guestName,
//     guestEmail,
//     guestPhone,
//     hotelName,
//     hotelLocation,
//     rooms,
//     grandTotal,
//     checkIn,
//     checkOut,
//     adults,
//     children,
// }) => {
//     if (!adminEmails || adminEmails.length === 0) {
//         console.warn("No admin emails found - skipping notification");
//         return;
//     }

//     const transporter = getTransporter(); // lazy - reads env vars now, not at import
//     const html = buildBookingEmailHtml({
//         bookingId, guestName, guestEmail, guestPhone,
//         hotelName, hotelLocation, rooms, grandTotal,
//         checkIn, checkOut, adults, children,
//     });

//     const nights = nightCount(checkIn, checkOut);

//     await transporter.sendMail({
//         from: `"HMS System" <\${process.env.SMTP_USER}>`,
//         to: adminEmails.join(", "),
//         subject: `New Booking #\${String(bookingId).padStart(6, "0")} - \${guestName} - \${hotelName} - \${nights} night\${nights !== 1 ? "s" : ""}`,
//         html,
//     });

//     console.log(`Email sent to \${adminEmails.length} admin(s) for booking #\${bookingId}`);
// };



import nodemailer from "nodemailer";

let _transporter = null;

const getTransporter = () => {
  if (_transporter) return _transporter;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      `SMTP not configured. Check SMTP_HOST, SMTP_USER, SMTP_PASS in .env\n` +
      `HOST: ${host || "MISSING"} | USER: ${user || "MISSING"} | PASS: ${pass ? "set" : "MISSING"}`
    );
  }

  _transporter = nodemailer.createTransport({
    host,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });

  return _transporter;
};

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const nightCount = (checkIn, checkOut) =>
  Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));

const buildBookingEmailHtml = ({
  bookingId, guestName, guestEmail, guestPhone,
  hotelName, hotelLocation, rooms, grandTotal,
  checkIn, checkOut, adults, children,
}) => {
  const nights = nightCount(checkIn, checkOut);
  const perNight = (grandTotal / nights).toFixed(2);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Booking - RT Grace Hotel</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f0eb;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0eb;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background-color:#6b3410;border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
              <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:5px;color:#d4a574;text-transform:uppercase;">RT Grace Hotel</p>
              <h1 style="margin:0;font-size:28px;font-weight:300;color:#ffffff;">New Booking Received</h1>
              <p style="margin:10px 0 0 0;font-size:13px;color:rgba(255,255,255,0.65);">A guest has confirmed a reservation</p>
            </td>
          </tr>

          <!-- BOOKING ID BANNER -->
          <tr>
            <td style="background-color:#8b4513;padding:14px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.7);letter-spacing:3px;text-transform:uppercase;">Booking Reference</p>
              <p style="margin:4px 0 0 0;font-size:22px;font-weight:600;color:#ffffff;letter-spacing:2px;">${String(bookingId).padStart(6, "0")}</p>
            </td>
          </tr>

          <!-- MAIN CARD -->
          <tr>
            <td style="background-color:#ffffff;padding:36px 40px;">

              <!-- Stay strip -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fdf8f3;border:1px solid #e8d5c4;border-radius:12px;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;border-right:1px solid #e8d5c4;text-align:center;width:33%;">
                    <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;">Check-in</p>
                    <p style="margin:0;font-size:15px;font-weight:600;color:#2d1a0e;">${fmtDate(checkIn)}</p>
                    <p style="margin:4px 0 0 0;font-size:11px;color:#9a7a6a;">From 14:00</p>
                  </td>
                  <td style="padding:20px 24px;border-right:1px solid #e8d5c4;text-align:center;width:33%;">
                    <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;">Duration</p>
                    <p style="margin:0;font-size:24px;font-weight:300;color:#8b4513;">${nights}</p>
                    <p style="margin:0;font-size:11px;color:#9a7a6a;">night${nights !== 1 ? "s" : ""}</p>
                  </td>
                  <td style="padding:20px 24px;text-align:center;width:33%;">
                    <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;">Check-out</p>
                    <p style="margin:0;font-size:15px;font-weight:600;color:#2d1a0e;">${fmtDate(checkOut)}</p>
                    <p style="margin:4px 0 0 0;font-size:11px;color:#9a7a6a;">By 11:00</p>
                  </td>
                </tr>
              </table>

              <!-- Property -->
              <p style="margin:0 0 12px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;border-bottom:1px solid #f0e8e0;padding-bottom:8px;">Property</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:4px 0;">
                    <p style="margin:0;font-size:18px;font-weight:600;color:#2d1a0e;">${hotelName}</p>
                    <p style="margin:4px 0 0 0;font-size:13px;color:#9a7a6a;">Location: ${hotelLocation}</p>
                  </td>
                </tr>
              </table>

              <!-- Rooms -->
              <p style="margin:0 0 12px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;border-bottom:1px solid #f0e8e0;padding-bottom:8px;">Rooms Booked</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                ${rooms.map((room, i) => `
                <tr>
                  <td style="padding:8px 0;${i < rooms.length - 1 ? "border-bottom:1px solid #f5ede6;" : ""}">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td><p style="margin:0;font-size:14px;font-weight:500;color:#2d1a0e;">Room: ${room.RoomName}</p></td>
                        <td align="right"><p style="margin:0;font-size:13px;color:#8b4513;font-weight:600;">$${parseFloat(room.Price).toFixed(2)}<span style="font-weight:400;color:#9a7a6a;font-size:11px;">/night</span></p></td>
                      </tr>
                    </table>
                  </td>
                </tr>`).join("")}
              </table>

              <!-- Guest -->
              <p style="margin:0 0 12px 0;font-size:10px;letter-spacing:3px;color:#8b4513;text-transform:uppercase;font-weight:600;border-bottom:1px solid #f0e8e0;padding-bottom:8px;">Guest Details</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:4px 0;width:50%;vertical-align:top;">
                    <p style="margin:0 0 2px 0;font-size:11px;color:#9a7a6a;text-transform:uppercase;letter-spacing:1px;">Full Name</p>
                    <p style="margin:0;font-size:14px;font-weight:500;color:#2d1a0e;">${guestName}</p>
                  </td>
                  <td style="padding:4px 0;width:50%;vertical-align:top;">
                    <p style="margin:0 0 2px 0;font-size:11px;color:#9a7a6a;text-transform:uppercase;letter-spacing:1px;">Email</p>
                    <p style="margin:0;font-size:14px;font-weight:500;color:#2d1a0e;">${guestEmail}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0 4px 0;vertical-align:top;">
                    <p style="margin:0 0 2px 0;font-size:11px;color:#9a7a6a;text-transform:uppercase;letter-spacing:1px;">Phone</p>
                    <p style="margin:0;font-size:14px;font-weight:500;color:#2d1a0e;">${guestPhone || "Not provided"}</p>
                  </td>
                  <td style="padding:12px 0 4px 0;vertical-align:top;">
                    <p style="margin:0 0 2px 0;font-size:11px;color:#9a7a6a;text-transform:uppercase;letter-spacing:1px;">Guests</p>
                    <p style="margin:0;font-size:14px;font-weight:500;color:#2d1a0e;">
                      ${adults} Adult${adults !== 1 ? "s" : ""}${children > 0 ? `, ${children} Child${children !== 1 ? "ren" : ""}` : ""}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Pricing -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fdf8f3;border:1px solid #e8d5c4;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e8d5c4;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td><p style="margin:0;font-size:13px;color:#6b5040;">Subtotal per night</p></td>
                        <td align="right"><p style="margin:0;font-size:13px;color:#2d1a0e;font-weight:500;">$${perNight}</p></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e8d5c4;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td><p style="margin:0;font-size:13px;color:#6b5040;">Duration</p></td>
                        <td align="right"><p style="margin:0;font-size:13px;color:#2d1a0e;font-weight:500;">${nights} night${nights !== 1 ? "s" : ""}</p></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 20px;background-color:#8b4513;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td><p style="margin:0;font-size:14px;color:rgba(255,255,255,0.85);font-weight:500;letter-spacing:1px;">GRAND TOTAL</p></td>
                        <td align="right"><p style="margin:0;font-size:22px;color:#ffffff;font-weight:700;">$${parseFloat(grandTotal).toFixed(2)}</p></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="background-color:#fdf8f3;border:1px solid #e8d5c4;border-top:none;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 16px 0;font-size:13px;color:#6b5040;">Review and manage this booking in the admin panel</p>
              <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}/admin/bookings"
                style="display:inline-block;background-color:#8b4513;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:12px 32px;border-radius:8px;letter-spacing:1px;">
                View Booking
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#2d1a0e;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 4px 0;font-size:13px;color:rgba(255,255,255,0.5);">RT Grace Hotel Management System</p>
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.3);">This is an automated notification. Please do not reply.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export const sendBookingNotification = async ({
  adminEmails,
  bookingId,
  guestName,
  guestEmail,
  guestPhone,
  hotelName,
  hotelLocation,
  rooms,
  grandTotal,
  checkIn,
  checkOut,
  adults,
  children,
}) => {
  if (!adminEmails || adminEmails.length === 0) {
    console.warn("No admin emails found - skipping notification");
    return;
  }

  const transporter = getTransporter();
  const html = buildBookingEmailHtml({
    bookingId, guestName, guestEmail, guestPhone,
    hotelName, hotelLocation, rooms, grandTotal,
    checkIn, checkOut, adults, children,
  });

  const nights = nightCount(checkIn, checkOut);

  await transporter.sendMail({
    from: `"RT Grace Hotel" <${process.env.SMTP_USER}>`,
    to: adminEmails.join(", "),
    subject: `New Booking ${String(bookingId).padStart(6, "0")} - ${guestName} - ${hotelName} - ${nights} night${nights !== 1 ? "s" : ""}`,
    html,
  });

  console.log(`Email sent to ${adminEmails.length} admin(s) for booking ${bookingId}`);
};

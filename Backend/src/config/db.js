// import sql from "mssql";
// import dotenv from "dotenv";

// // const config = {
// //   server: process.env.DB_SERVER || "localhost",
// //   database: process.env.DB_DATABASE || "HotelManagementSystem",
// //   user: process.env.DB_USER || "sa",
// //   password: process.env.DB_PASSWORD || "",
// //   port: parseInt(process.env.DB_PORT) || 1433,
// //   options: {
// //     encrypt: false,
// //     trustServerCertificate: true,
// //     enableArithAbort: true,
// //   },
// //   pool: {
// //     max: 10,
// //     min: 0,
// //     idleTimeoutMillis: 30000,
// //   },
// // };


// const sql = require("mssql");

// export const config = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   server: process.env.DB_SERVER,
//   database: process.env.DB_DATABASE,
//   port: 1433,
//   options: {
//     encrypt: false,
//     trustServerCertificate: true
//   }
// };

// sql.connect(config)
//   .then(() => console.log("Connected"))
//   .catch(err => console.log(err));


// let pool;

// export const getPool = async () => {
//   if (!pool) {
//     pool = await sql.connect(config);
//     console.log("✅ Connected to SQL Server");
//   }
//   return pool;
// };






// import sql from "mssql";

// const config = {
//   server: "localhost",
//    port: 1433, 
//   database: "HotelManagementSystem",
//   options: {
//     trustServerCertificate: true,
//     encrypt: false,
//   },
// };

// let pool;

// export const getPool = async () => {
//   if (!pool) {
//     pool = await sql.connect(config);
//     console.log("✅ SQL Connected (Windows Auth)");
//   }
//   return pool;
// };

// export { sql };

import sql from "mssql";

const config = {
  // OR try "localhost"
  user: "Talha",
  password: "14/08/2005.mts",
  server: "DESKTOP-FPMJH3I",
  database: "HotelManagementSystem",

  port: 1433,
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbort: true,
  },

};

let pool;

export const getPool = async () => {

  pool = await sql.connect(config);

  console.log("✅ SQL Connected (SQL Auth)");

  return pool;
};

export { sql };
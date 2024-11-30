require("dotenv").config();
const mysql = require("mysql2/promise");
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: process.env.DB_PASSWORD, //change this based on your MYSQL data
  database: "secoms3190",
});

module.exports = db;

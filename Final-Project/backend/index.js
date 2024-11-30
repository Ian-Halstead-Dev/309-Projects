// Import dependencies
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mysql = require("mysql2/promise");
const crypto = require("crypto");
const userRouter = require("./routers/userRouter");

require("dotenv").config();

// Configuration
const port = "8081";
const host = "localhost";
// MySQL Database Connection

// // Connect to Database
// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err.message);
//     process.exit(1); // Exit if DB connection fails
//   }
//   console.log("Connected to the database successfully.");
// });

// // Ensure "uploads" folder exists
// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
// }

// Configure multer for image uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Save images in "uploads" directory
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
//     cb(null, uniqueName); // Unique filenames
//   },
// });
// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png"];
//     if (!allowedTypes.includes(file.mimetype)) {
//       return cb(new Error("Only JPEG and PNG files are allowed."));
//     }
//     cb(null, true);
//   },
//   limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
// });

// Initialize the Express App
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads")); // Serve static files
app.use("/users", userRouter);

// Start Server
app.listen(port, () => {
  console.log(`App running at http://${host}:${port}/`);
});

// API Routes

// Create User
// app.post("/users", async (req, res) => {
//   let findUserQuery = "SELECT * FROM users WHERE users.email = ?";
//   let email = [req.body.email];

//   let [users] = await db.query(findUserQuery, email);
//   if (users.length != 0) {
//     return res.status(409).json({ error: "User with email already exists" });
//   }

//   let salt = crypto.randomBytes(16).toString("hex");
//   let hash = crypto
//     .pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`)
//     .toString(`hex`);

//   let insertQuery =
//     "INSERT INTO users (email, password, salt) VALUES (?, ?, ?)";
//   let values = [req.body.email, hash, salt];
//   await db.query(insertQuery, values);
//   return res.status(200).json({});
// });

// app.put("/users/login", async (req, res) => {
//   let findUserQuery = "SELECT * FROM users WHERE users.email = ?";
//   let email = [req.body.email];

//   let [users] = await db.query(findUserQuery, email);

//   if (users.length == 0) {
//     return res.status(404).send("Email or password incorrect");
//   }

//   let user = users[0];
//   let hash = crypto
//     .pbkdf2Sync(req.body.password, user.salt, 1000, 64, `sha512`)
//     .toString(`hex`);

//   if (hash !== user.password) {
//     return res.status(404).send("Email or password incorrect");
//   }

//   // Signed in
//   let token = crypto.randomBytes(16).toString("hex");
//   let hashedToken = crypto
//     .pbkdf2Sync(token, process.env.TOKEN_SECRET, 1000, 64, `sha512`)
//     .toString(`hex`);

//   let updateQuery = "UPDATE users SET token = ? WHERE email = ?";
//   await db.query(updateQuery, [hashedToken, email[0]]);

//   return res.status(200).json({ token });
// });

// app.delete("/users", authMiddleware, async (req, res) => {
//   let updateQuery = "DELETE FROM users WHERE email = ?";
//   await db.query(updateQuery, [req.user.email]);
//   res.status(200).send("User deleted successfully");
// });

// // Get All Contacts
// app.get("/contact", (req, res) => {
//   const query = "SELECT * FROM contact";
//   db.query(query, (err, result) => {
//     if (err) {
//       console.error("Error fetching contacts:", err.message);
//       return res.status(500).json({ error: "Failed to fetch contacts" });
//     }
//     res.status(200).json(result);
//   });
// });

// // Add a New Contact
// app.post("/contact", upload.single("image"), (req, res) => {
//   const { contact_name, phone_number, message } = req.body;
//   const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

//   const checkQuery = "SELECT * FROM contact WHERE contact_name = ?";
//   db.query(checkQuery, [contact_name], (checkErr, checkResult) => {
//     if (checkErr) {
//       console.error("Validation error:", checkErr.message);
//       return res.status(500).json({ error: "Error validating contact name" });
//     }
//     if (checkResult.length > 0) {
//       return res.status(409).json({ error: "Contact name already exists" });
//     }

//     const query =
//       "INSERT INTO contact (contact_name, phone_number, message, image_url) VALUES (?, ?, ?, ?)";
//     db.query(query, [contact_name, phone_number, message, imageUrl], (err) => {
//       if (err) {
//         console.error("Error adding contact:", err.message);
//         return res.status(500).json({ error: "Failed to add contact" });
//       }
//       res.status(201).json({ message: "Contact added successfully" });
//     });
//   });
// });

// // Delete a Contact by ID
// app.delete("/contact/:id", (req, res) => {
//   const { id } = req.params;
//   const query = "DELETE FROM contact WHERE id = ?";
//   db.query(query, [id], (err, result) => {
//     if (err) {
//       console.error("Error deleting contact:", err.message);
//       return res.status(500).json({ error: "Failed to delete contact" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Contact not found" });
//     }
//     res.status(200).json({ message: "Contact deleted successfully" });
//   });
// });

// // Update a Contact by ID
// app.put("/contact/:id", (req, res) => {
//   const { id } = req.params;
//   const { contact_name, phone_number, message } = req.body;

//   const query =
//     "UPDATE contact SET contact_name = ?, phone_number = ?, message = ? WHERE id = ?";
//   db.query(query, [contact_name, phone_number, message, id], (err, result) => {
//     if (err) {
//       console.error("Error updating contact:", err.message);
//       return res.status(500).json({ error: "Failed to update contact" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Contact not found" });
//     }
//     res.status(200).json({ message: "Contact updated successfully" });
//   });
// });

// // Search Contacts by Name
// app.get("/contact/name", (req, res) => {
//   const { contact_name } = req.query;
//   if (!contact_name) {
//     return res.status(400).json({ error: "contact_name is required" });
//   }

//   const query = "SELECT * FROM contact WHERE LOWER(contact_name) LIKE LOWER(?)";
//   const searchValue = `%${contact_name}%`;
//   db.query(query, [searchValue], (err, result) => {
//     if (err) {
//       console.error("Error searching contacts:", err.message);
//       return res.status(500).json({ error: "Failed to search contacts" });
//     }
//     res.status(200).json(result);
//   });
// });

// app.post("/users", (req, res) => {
//   const user = req.body;
//   db.query("INSET INTO users");
// });

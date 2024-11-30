const express = require("express");
const crypto = require("crypto");
const db = require("../db/db.js");
const authMiddleware = require("../middleware/auth");
require("dotenv").config();

const router = express.Router();

router.post("/", async (req, res) => {
  let findUserQuery = "SELECT * FROM users WHERE users.email = ?";
  let email = [req.body.email];

  let [users] = await db.query(findUserQuery, email);
  if (users.length !== 0) {
    return res.status(409).json({ error: "User with email already exists" });
  }

  let salt = crypto.randomBytes(16).toString("hex");
  let hash = crypto
    .pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`)
    .toString(`hex`);

  let insertQuery =
    "INSERT INTO users (email, password, salt) VALUES (?, ?, ?)";
  let values = [req.body.email, hash, salt];
  await db.query(insertQuery, values);

  return res.status(200).json({});
});

router.put("/login", async (req, res) => {
  let findUserQuery = "SELECT * FROM users WHERE users.email = ?";
  let email = [req.body.email];

  let [users] = await db.query(findUserQuery, email);

  if (users.length == 0) {
    return res.status(404).send("Email or password incorrect");
  }

  let user = users[0];
  let hash = crypto
    .pbkdf2Sync(req.body.password, user.salt, 1000, 64, `sha512`)
    .toString(`hex`);

  if (hash !== user.password) {
    return res.status(404).send("Email or password incorrect");
  }

  let token = crypto.randomBytes(16).toString("hex");
  let hashedToken = crypto
    .pbkdf2Sync(token, process.env.TOKEN_SECRET, 1000, 64, `sha512`)
    .toString(`hex`);

  let updateQuery = "UPDATE users SET token = ? WHERE email = ?";
  await db.query(updateQuery, [hashedToken, email[0]]);

  return res.status(200).json({ token });
});

router.delete("/", authMiddleware, async (req, res) => {
  let updateQuery = "DELETE FROM users WHERE email = ?";
  await db.query(updateQuery, [req.user.email]);
  res.status(200).send("User deleted successfully");
});

module.exports = router;

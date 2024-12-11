const express = require("express");
const crypto = require("crypto");
const db = require("../db/db.js");
const authMiddleware = require("../middleware/auth");
require("dotenv").config();

const router = express.Router();

router.post("/", async (req, res) => {
  let findUserQuery = "SELECT * FROM users WHERE users.email = ?";
  let email = [req.body.email];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send("Invalid email");
  }

  let [users] = await db.query(findUserQuery, email);
  if (users.length !== 0) {
    return res.status(409).json({ error: "User with email already exists" });
  }

  let salt = crypto.randomBytes(16).toString("hex");
  let hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString(`hex`);

  let insertQuery = "INSERT INTO users (email, password, salt) VALUES (?, ?, ?)";
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
  let hash = crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64, `sha512`).toString(`hex`);

  if (hash !== user.password) {
    return res.status(404).send("Email or password incorrect");
  }

  let token = crypto.randomBytes(16).toString("hex");
  let hashedToken = crypto.pbkdf2Sync(token, process.env.TOKEN_SECRET, 1000, 64, `sha512`).toString(`hex`);

  let updateQuery = "UPDATE users SET token = ? WHERE email = ?";
  await db.query(updateQuery, [hashedToken, email[0]]);

  return res.status(200).json({ token });
});

router.get("/:token", authMiddleware, (req, res) => {
  return res.status(200).json(req.user);
});

router.put("/changePassword", authMiddleware, async (req, res) => {
  if (req.body.password === undefined) {
    return res.status(400).send("New Password is required");
  }

  let salt = crypto.randomBytes(16).toString("hex");
  let hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString(`hex`);

  let insertQuery = "Update users SET password = ?, salt = ? WHERE email = ?";
  let values = [hash, salt, req.user.email];
  await db.query(insertQuery, values);

  res.status(200).send("Password updated successfully");
});

router.get("/notifications/:token", authMiddleware, async (req, res) => {
  let query =
    "SELECT * FROM users JOIN notifications on users.email = notifications.userEmail WHERE users.email = ? AND notifications.message NOT LIKE 'OUTBID%'";
  let param = [req.user.email];
  let [notifications] = await db.query(query, param);
  res.status(200).json(notifications);
});

router.get("/outbid/:token", authMiddleware, async (req, res) => {
  let query =
    "SELECT * FROM users JOIN notifications on users.email = notifications.userEmail WHERE users.email = ? AND notifications.message LIKE 'OUTBID%'";

  let param = [req.user.email];
  let [rows] = await db.query(query, param);

  let ids = [];

  for (let i = 0; i < rows.length; i++) {
    console.log(rows[i]);
    ids.push(parseInt(rows[i].message.split(" ")[1]));
  }

  res.status(200).json(ids);
});

router.get("/test", async (req, res) => {
  let decrementQuery = "UPDATE auctions SET days_remaining = days_remaining - 1";
  await db.query(decrementQuery);

  let expiredAuctionsQuery = "SELECT * FROM auctions WHERE days_remaining < 0";
  let [rows] = await db.query(expiredAuctionsQuery);

  for (row of rows) {
    if (row.currentWinner !== null) {
      let auctionWonNotifQuery = "INSERT INTO notifications (userEmail, message, seen, timeSent) VALUES (?,?,?,?)";
      let message =
        "You have wont the auction for " +
        row.title +
        " at $" +
        (row.curr_price / 100).toFixed(2) +
        ". Contact " +
        row.owner +
        " to proceed.";
      let params = [row.currentWinner, message, false, new Date(Date.now()).toISOString().split("T")[0]];
      db.query(auctionWonNotifQuery, params);
      message =
        "The auction for " +
        row.title +
        " at $" +
        (row.curr_price / 100).toFixed(2) +
        "has finished. Contact " +
        row.currentWinner +
        " to proceed.";
      params = [row.owner, message, false, new Date(Date.now()).toISOString().split("T")[0]];
      db.query(auctionWonNotifQuery, params);
    }
  }

  let deleteQuery = "DELETE FROM auctions WHERE days_remaining < 0";
  await db.query(deleteQuery);
  res.status(200).send("done");
});

router.get("/auctions/:token", authMiddleware, async (req, res) => {
  let query = "SELECT auctions.* FROM users JOIN auctions ON users.email = auctions.owner WHERE auctions.owner = ?";
  let [rows] = await db.query(query, [req.user.email]);
  return res.status(200).send({ auctions: rows });
});

router.get("/myBids/:token", authMiddleware, async (req, res) => {
  let query = "SELECT auctions.* FROM users JOIN auctions ON users.email = auctions.owner WHERE auctions.currentWinner = ?";
  let [rows] = await db.query(query, [req.user.email]);
  return res.status(200).send({ auctions: rows });
});

router.delete("/notification", authMiddleware, async (req, res) => {
  console.log("DELETE");
  let query = "DELETE FROM notifications WHERE userEmail = ? AND id = ?";
  let params = [req.user.email, req.body.id];
  await db.query(query, params);

  res.status(200).send("Delete Successfully");
});

router.delete("/", authMiddleware, async (req, res) => {
  let findUserQuery = "SELECT * FROM users as u JOIN auctions as a ON a.owner = u.email WHERE u.email = ?";
  let [rows] = await db.query(findUserQuery, [req.user.email]);
  console.log(rows);
  if (rows.length != 0) {
    return res.status(400).send("Cannot delete a user who is the owner or current top bidder of an auction");
  }
  let findUserQuery2 = "SELECT * FROM users as u JOIN auctions as a ON a.currentWinner = u.email WHERE u.email = ?";
  let [rows2] = await db.query(findUserQuery2, [req.user.email]);
  console.log(rows2);
  if (rows2.length != 0) {
    return res.status(400).send("Cannot delete a user who is the owner or current top bidder of an auction");
  }
  let updateQuery = "DELETE FROM users WHERE email = ?";
  await db.query(updateQuery, [req.user.email]);
  res.status(200).send("User deleted successfully");
});

module.exports = router;

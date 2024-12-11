const express = require("express");
const db = require("../db/db.js");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory where images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Images only!"));
    }
  },
});


router.post("/:token", authMiddleware, upload.single("image"), async (req, res) => {
  const { title, description, startPrice, daysActive } = req.body;

  console.log(req.body);

  // Check required fields
  if (!title || !description || !startPrice || !daysActive) {
    return res.status(400).send("Title, startPrice, daysActive, and description are required");
  }

  // Handle file upload
  const fileSrc = req.file ? `/uploads/${req.file.filename}` : "/uploads/placeholder.png";

  const query = "INSERT INTO auctions (title, description, owner, curr_price, days_remaining, fileSrc) VALUES (?, ?, ?, ?, ?, ?)";

  const queryParams = [
    title,
    description,
    req.user.email,
    parseFloat(startPrice) * 100, // Convert to cents
    daysActive,
    fileSrc,
  ];

  try {
    await db.query(query, queryParams);
    return res.status(200).send("Product Created");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

router.delete("/", authMiddleware, async (req, res) => {
  console.log(req.body);
  let findAuctionQuery = "SELECT * FROM auctions WHERE id = ?";
  let params = [req.body.id];

  let [rows] = await db.query(findAuctionQuery, params);

  if (rows.length === 0) {
    return res.status(404).send("Auction not found");
  }

  if (req.user.email != rows[0].owner) {
    return res.status(403).send("You cannot delete this auction");
  }

  if (rows[0].currentWinner) {
    return res.status(400).send("Cannot delete a auction with bids");
  }

  let deleteQuery = "DELETE FROM auctions WHERE id = ?";

  await db.query(deleteQuery, params);

  return res.status(200).send("Auction deleted successfully");
});

router.put("/bid", authMiddleware, async (req, res) => {
  console.log(req.body);
  if (req.body.bidId === undefined || req.body.bidAmount === undefined) {
    return res.status(400).send("Request must include bidId and bidAmount");
  }
  let auctionQuery = "SELECT * FROM auctions WHERE id = ?";
  let param = [req.body.bidId];
  let [auction] = await db.query(auctionQuery, param);

  if (auction.length == 0) {
    return res.status(404).send("Auction not found");
  }
  auction = auction[0];

  let bidAmount = req.body.bidAmount * 100;

  if (auction.curr_price > bidAmount) {
    return res.status(400).send("bidAmount must be greater than the current price: $" + (auction.curr_price / 100).toFixed(2));
  }

  if (auction.currentWinner != null) {
    let notifQuery = "INSERT INTO notifications (userEmail, message, seen, timeSent) VALUES (?,?,?,?)";
    let params = [auction.currentWinner, "OUTBID " + req.body.bidId, false, new Date(Date.now()).toISOString().split("T")[0]];
    await db.query(notifQuery, params);
  }

  let updateQuery = "UPDATE auctions SET curr_price = ?, currentWinner = ? WHERE id = ?";
  let updateParams = [bidAmount, req.user.email, req.body.bidId];

  await db.query(updateQuery, updateParams);

  let deleteNotifQuery = "DELETE FROM notifications WHERE message LIKE CONCAT('OUTBID %', ?, '%') AND userEmail = ?";
  console.log({ auctionId: auction.id, userEmail: req.user.email });
  let deleteParams = [auction.id, req.user.email];
  await db.query(deleteNotifQuery, deleteParams);

  res.status(200).send("Updated auction");
});

router.get("/", async (req, res) => {
  let query = "SELECT * FROM auctions";
  let [rows] = await db.query(query);
  res.status(200).send(rows);
});

router.get("/:id", async (req, res) => {
  let query = "SELECT * FROM auctions WHERE id = ?";
  let params = [req.params.id];
  let [rows] = await db.query(query, params);
  if (rows.length === 0) {
    res.status(404).send("Auction not found");
  }
  res.status(200).send(rows[0]);
});

module.exports = router;

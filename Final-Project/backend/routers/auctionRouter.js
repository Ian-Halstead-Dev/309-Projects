const express = require("express");
const db = require("../db/db.js");
const authMiddleware = require("../middleware/auth");
require("dotenv").config();
const router = express.Router();

router.post("", authMiddleware, async (req, res) => {
  if (
    req.body.title === undefined ||
    req.body.description === undefined ||
    req.body.startPrice === undefined ||
    req.body.daysActive === undefined
  ) {
    return res.status(400).send("Title, startPrice, daysActive, and description are required");
  }
  req.body.startPrice = req.body.startPrice * 100;

  let query = "INSERT INTO auctions (title, description, owner, curr_price, days_remaining ) VALUES (?, ?, ?, ?, ?)";

  let queryParams = [req.body.title, req.body.description, req.user.email, req.body.startPrice, req.body.daysActive];
  await db.query(query, queryParams);
  return res.status(200).send("Product Created");
});

router.put("/bid", authMiddleware, async (req, res) => {
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

  let updateQuery = "UPDATE auctions SET curr_price = ?, currentWinner = ? WHERE id = ?";
  let updateParams = [bidAmount, req.user.email, req.body.bidId];
  await db.query(updateQuery, updateParams);
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

let cron = require("node-cron");
const db = require("../db/db");

cron.schedule("0 0 * * *", async () => {
  let decrementQuery = "UPDATE auctions SET days_remaining = days_remaining - 1";
  await db.query(decrementQuery);

  let expiredAuctionsQuery = "SELECT * FROM auctions WHERE days_remaining < 0";
  let [rows] = await db.query(expiredAuctionsQuery);

  for (row of rows) {
    // Check if there is a current winner
    if (row.currentWinner) {
      let auctionWonNotifQuery = "INSERT INTO notifications (userEmail, message, seen, timeSent) VALUES (?,?,?,?)";

      // Message for the current winner
      let message =
        "You have won the auction for " +
        row.title +
        " at $" +
        (row.curr_price / 100).toFixed(2) +
        ". Contact " +
        row.owner +
        " to proceed.";
      let params = [row.currentWinner, message, false, new Date(Date.now()).toISOString().split("T")[0]];
      await db.query(auctionWonNotifQuery, params);

      // Message for the auction owner (if there was a winner)
      message =
        "The auction for " +
        row.title +
        " at $" +
        (row.curr_price / 100).toFixed(2) +
        " has finished. Contact " +
        row.currentWinner +
        " to proceed.";
      params = [row.owner, message, false, new Date(Date.now()).toISOString().split("T")[0]];
      await db.query(auctionWonNotifQuery, params);
    } else {
      // No winner case: send a different message to the auction owner
      let auctionWonNotifQuery = "INSERT INTO notifications (userEmail, message, seen, timeSent) VALUES (?,?,?,?)";
      let message =
        "The auction for " +
        row.title +
        " at $" +
        (row.curr_price / 100).toFixed(2) +
        " has finished, but no bids were placed. Please consider relisting it or adjusting the starting price.";
      let params = [row.owner, message, false, new Date(Date.now()).toISOString().split("T")[0]];
      await db.query(auctionWonNotifQuery, params);
    }
  }
});

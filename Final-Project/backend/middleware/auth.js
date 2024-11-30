const crypto = require("crypto");
const db = require("../db/db.js");
let authMiddleware = async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }

  let hashedToken = crypto
    .pbkdf2Sync(token, process.env.TOKEN_SECRET, 1000, 64, `sha512`)
    .toString(`hex`); // Hash the received token

  let query = "SELECT * FROM users WHERE token = ?";
  let [user] = await db.query(query, [hashedToken]);

  if (user.length == 0) {
    return res.status(404).json({ error: "Invalid token" });
  }

  req.user = user[0]; // Attach user to request object
  next();
};

module.exports = authMiddleware;

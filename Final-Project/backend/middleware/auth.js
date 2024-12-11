const crypto = require("crypto");
const db = require("../db/db.js");

let authMiddleware = async (req, res, next) => {
  let token =
    req.body.token || // Check token in the body
    req.params.token || // Check token in the URL params
    req.headers.authorization?.split(" ")[1]; // Check token in the Authorization header

  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }

  // Hash the token
  let hashedToken = crypto.pbkdf2Sync(token, process.env.TOKEN_SECRET, 1000, 64, `sha512`).toString(`hex`);

  try {
    // Verify the hashed token against the database
    let query = "SELECT * FROM users WHERE token = ?";
    let [user] = await db.query(query, [hashedToken]);

    if (user.length === 0) {
      return res.status(404).json({ error: "Invalid token" });
    }

    // Attach the user information to the request object
    req.user = user[0];
    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = authMiddleware;

//JWT AUTH MIDDLEWARE
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "No token provided" });
  }

  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = header.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = payload; // payload.sub = userId
    next();
  });
}

module.exports = auth;
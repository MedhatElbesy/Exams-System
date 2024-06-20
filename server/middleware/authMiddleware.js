const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  // Get token from header
  const token = req.headers.authorization?.split(" ")[1] ?? null;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    // Add user from payload
    req.user = await User.findById(decoded.user.id).select("-password");
    next();
  } catch (error) {
    res.status(500).json({ message: "server auth error" });
  }
};

module.exports = authMiddleware;

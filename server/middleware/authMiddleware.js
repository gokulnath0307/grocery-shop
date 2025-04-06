const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
    if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user exists in the database
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // Attach full user data to request
    req.userId=user._id
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Role-based authorization
const authorizeRoles = (req, res, next) => {
  if (!req.user || !"member".includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied: Insufficient permissions" });
  }
  next();
};

module.exports = { authenticate, authorizeRoles };

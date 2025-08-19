// routes/activityRoutes.js
const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");
const jwt = require("jsonwebtoken");

// Middleware to verify token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid Token" });
  }
}

// GET /api/activity/logs
router.get("/logs", verifyToken, async (req, res) => {
  try {
    const logs = await Activity.find({ userId: req.user.id }).sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

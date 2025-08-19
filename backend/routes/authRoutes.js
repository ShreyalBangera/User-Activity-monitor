const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Activity = require("../models/Activity");

// Register route
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash });
    await user.save();
    res.json({ message: "User registered" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Error registering user", error: err });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt:", username);

    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, { expiresIn: '2h' });

    // Log login activity
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    await new Activity({
      userId: user._id,
      username: user.username,
      action: "Login",
      ip
    }).save();

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login error", error: err });
  }
});

// Logout route
router.post("/logout", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    await new Activity({
      userId: decoded.id,
      username: decoded.username,
      action: "Logout",
      ip,
    }).save();

    res.json({ message: "Logout activity recorded" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Error logging out", error: err });
  }
});

module.exports = router;

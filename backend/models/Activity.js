const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    username: String,
    action: String, // "Login" or "Logout"
    ip: String,
  },
  { timestamps: true } // <--- this adds createdAt and updatedAt
);

module.exports = mongoose.model("Activity", activitySchema);

// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  appwriteId: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, required: true },
  provider: { type: String, enum: ["email", "google"], required: true },
});

module.exports = mongoose.model("User", userSchema);

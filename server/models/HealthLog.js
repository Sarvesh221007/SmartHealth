const mongoose = require("mongoose");

const healthLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  symptoms: String,
  mood: String,
  vitals: Object,
  notes: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("HealthLog", healthLogSchema);

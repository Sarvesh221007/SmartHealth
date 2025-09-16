const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required:true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required:true },
  medicine: { type: String, required:true },
  dosage: { type: String, required:true },
  schedule: { type: String, required:true }, // e.g., "2 times a day"
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date }
}, { timestamps:true });

module.exports = mongoose.model("Prescription", prescriptionSchema);

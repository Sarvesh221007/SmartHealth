const HealthLog = require("../models/HealthLog");

// Add new health log
exports.addHealthRecord = async (req, res) => {
  try {
    const { symptoms, mood, vitals, notes } = req.body;
    const log = new HealthLog({ symptoms, mood, vitals, notes, user: req.user?._id });
    await log.save();
    res.status(201).json({ message: "Health record added", record: log });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all health logs
exports.getHealthRecords = async (req, res) => {
  try {
    const logs = await HealthLog.find().sort({ date: -1 });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

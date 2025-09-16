const express = require("express");
const { addHealthRecord, getHealthRecords } = require("../controllers/healthController");
const router = express.Router();


// Get all health logs
router.get("/", getHealthRecords);

module.exports = router;

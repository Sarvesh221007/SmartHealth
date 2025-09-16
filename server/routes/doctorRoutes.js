const express = require("express");
const User = require("../models/User");
const auth = require("../middlewares/auth");
const { requireRole } = require("../middlewares/role");
const router = express.Router();

router.get("/patients", auth, requireRole("doctor"), async (req,res)=>{
  const patients = await User.find({ role:"patient" }).select("-password");
  res.json(patients);
});

module.exports = router;

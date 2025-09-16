const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { googleLogin } = require("../controllers/googleController"); // new controller
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// New route for Google login/signup
router.post("/google-login", googleLogin);

module.exports = router;

const express = require("express");
const { registerUser, loginUser, refreshToken } = require("../controllers/authController");
const { googleLogin } = require("../controllers/googleController"); // new controller
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/refresh-token", refreshToken); // New refresh token route

// New route for Google login/signup
router.post("/google-login", googleLogin);

module.exports = router;

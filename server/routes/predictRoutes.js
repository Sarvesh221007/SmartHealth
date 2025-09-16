// server/routes/predictRoutes.js
const express = require("express");
const router = express.Router();
const { predictDiabetes, predictHeart, predictParkinsons, predictCancer } = require("../controllers/predictController");

router.post("/diabetes", predictDiabetes);
router.post("/heart", predictHeart);
router.post("/parkinsons", predictParkinsons);
router.post("/cancer", predictCancer);

module.exports = router;

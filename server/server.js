// server/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // ✅ Import CORS
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const healthRoutes = require("./routes/healthRoutes");
const predictRoutes = require("./routes/predictRoutes");

dotenv.config();
const app = express();
app.use(express.json());

// Enable CORS for your frontend
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true,               // if you are sending cookies or auth headers
}));

// Connect to DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/predict", predictRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

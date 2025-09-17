const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://sarveshsingh8303744279_db_user:xVr6OPgtCfs7uyFr@smarthealth01.eryduze.mongodb.net/smarthealth?retryWrites=true&w=majority");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;


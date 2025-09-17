const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://sarveshsingh8303744279_db_user:xVr6OPgtCfs7uyFr@smarthealth01.eryduze.mongodb.net/?retryWrites=true&w=majority&appName=SmartHealth01", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

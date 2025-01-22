require("dotenv").config();
const mongoose = require("mongoose");
const databaseUrl = process.env.MONGO_URI;

// Function to setup and connect to MongoDB
const setupDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose
      .connect(databaseUrl, {})
      .then(() => console.log("Successfully connected to MongoDB!"))
      .catch((err) => console.log(err));
  } catch (error) {
    return null;
  }
};

module.exports = setupDB;

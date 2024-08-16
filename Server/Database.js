const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(`Error occured in connecting to database ${error}`);
  }
};

module.exports = connectDatabase;

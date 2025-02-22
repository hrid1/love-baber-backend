const mongoose = require("mongoose");
require("dotenv").config();

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected")
  } catch (error) {
    console.log("Error", error);
    process.exit(1);
  }
};

module.exports = ConnectDB;

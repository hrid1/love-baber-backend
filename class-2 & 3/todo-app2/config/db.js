require("dotenv").config();
const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    })
    .then(() => console.log("DB connection successful"))
    .catch((error) => {
      console.log("Issue in DB connection");
      console.log(error.message);
      process.exit(1);
    });
};

module.exports = dbConnect;

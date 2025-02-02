const express = require("express");
const ConnectDB = require("./config/db");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 5000;


// connect db
ConnectDB();
app.get("/", (req, res) => {
  res.send("Hello File System!");
});

app.listen(port, () => {
  console.log("Server is Running on", port);
});

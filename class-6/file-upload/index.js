const express = require("express");
const ConnectDB = require("./config/db");
require("dotenv").config();
const app = express();
const fileUpload = require("express-fileupload");
const cloudinaryConnect = require("./config/cloudinary");
const Upload = require("./routes/FileUpload");
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(fileUpload());

// connect db
ConnectDB();
// connect cloud
cloudinaryConnect();

// api routes
app.use("/api/v1/upload", Upload);

app.get("/", (req, res) => {
  res.send("Hello File System!");
});

app.listen(port, () => {
  console.log("Server is Running on", port);
});

const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
connectDB();
// middleware
app.use(express.json());

// routes
const blog = require("./routes/blog");
app.use("/api", blog);

app.get("/", (req, res) => {
  res.send("<h2>THis is Blog App</h2>");
});

app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
});

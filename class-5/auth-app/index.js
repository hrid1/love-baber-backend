const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// connect DB
connectDB();

// middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello Auth");
});

app.listen(PORT, () => {
  console.log(`Server is Running on port`, PORT);
});

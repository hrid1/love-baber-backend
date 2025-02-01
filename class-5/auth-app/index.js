const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth")

const app = express();
const PORT = process.env.PORT || 3000;

// connect DB
connectDB();

// middleware
app.use(express.json());

// Routes
app.use("/api/v1", authRoutes)

app.get("/", (req, res) => {
  res.send("Hello Auth");
});

app.listen(PORT, () => {
  console.log(`Server is Running on port`, PORT);
});

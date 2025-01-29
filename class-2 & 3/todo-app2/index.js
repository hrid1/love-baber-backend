const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const todoRoutes = require("./routes/todos");

app.use("/api/v1", todoRoutes);

app.get("/", async (req, res) => {
  res.send("Hello Todo");
});

app.listen(port, () => {
  console.log("App is running successfully");
});

// connect with db
const dbConncet = require("./config/db");
dbConncet();

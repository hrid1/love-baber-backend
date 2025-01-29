const express = require("express");
const app = express();
const port = 8000;

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/car", async (req, res) => {
  const data = req.body;
  const { name, brand } = data;
  console.log(name, brand);
  res.send("Car submitted successfully!")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

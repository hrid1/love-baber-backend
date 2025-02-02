const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/Auth");
const { verifyAuth } = require("../middleware/auth");
const User = require("../model/User");

router.post("/signup", signup);
router.post("/login", login);

router.get("/test", verifyAuth, (req, res) => {
  res.send("Hello test");
});

router.get("/user", verifyAuth, async (req, res) => {
  const id = req?.user.id;
    console.log("id", id);
    const result = await User.findById(id);
  res.send({
    success: "true",
    user: result,
  });
});
module.exports = router;

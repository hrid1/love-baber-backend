const jwt = require("jsonwebtoken");
require("dotenv").config();
// varify the token
const verifyAuth = (req, res, next) => {
  // const token =  req.body.token;
  const token = req.cookies?.token;
  console.log(req.cookies);
  //   const authHeader = req.headers.authorization;
  //   if (!authHeader) {
  //     return res
  //       .status(401)
  //       .json({ success: false, message: "Unauthorized Access " });
  //   }
  //   const token = authHeader.split(" ")[1];

  console.log("got token: ", token);
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token not Found " });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

const verifyAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "This is for Admin Route",
      });
    }
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid Access" });
  }
};

const verifySeller = (req, res, next) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(400).json({
        success: false,
        message: "This is for Admin Route",
      });
    }
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid Access" });
  }
};
module.exports = { verifyAuth, verifyAdmin, verifySeller };

const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    // if user already exists
    const isExisted = await User.findOne({ email });
    if (isExisted) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    // secure password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    // save user to database
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate email and password
    if (!email || !password) {
      return res.status(400).json({
        success: true,
        message: "Please fill all the details carefully.",
      });
    }
    const user = (await User.findOne({ email })) || {};
    // check registerd user
    if (!user)
      return res
        .status(400)
        .json({ success: true, message: "Don't have the Account." });
    // varify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: true, message: "Invalid credentials" });
    // create token
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    user.token = token;
    user.password = undefined;

    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "User Loggeed in successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure",
    });
  }
};


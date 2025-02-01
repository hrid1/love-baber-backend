const bcrypt = require("bcrypt");
const User = require("../model/User");

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

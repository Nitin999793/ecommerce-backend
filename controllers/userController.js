const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔐 REGISTER
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // 🔥 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });

    const saved = await user.save();

    res.json({
      msg: "User registered",
      user: saved,
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 🔐 LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // 🔥 COMPARE PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // 🔥 GENERATE TOKEN
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      "secretkey", // later move to .env
      { expiresIn: "1d" }
    );

    res.json({
      msg: "Login successful",
      token,
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { registerUser, loginUser };

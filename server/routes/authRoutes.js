const express = require("express");
const router = express.Router();

const User = require("../models/user");

// Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    res.json({
      message: "Login successful",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


module.exports = router;
// controllers/authController.js

const User = require("../models/User");
const generateToken = require("../config/generateToken"); // 👈 import token helper

// ---- SIGNUP (already written) ----
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
  console.error("🔥 FULL ERROR ↓↓↓");
  console.error(error.stack);   // 👈 THIS IS KEY

  res.status(500).json({
    message: "Server error",
    error: error.message,
  });
}
};

// ---- LOGIN (new) ----
// @desc    Login user and return JWT token
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  // 1. Pull email and password from the request body
  const { email, password } = req.body;

  try {
    // 2. Check that both fields were provided
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // 3. Look up the user by email in MongoDB
    const user = await User.findOne({ email });

    // 4. If no user found, reject early
    //    Note: intentionally vague message — don't reveal if email exists
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 5. Compare the entered password with the hashed one in DB
    //    matchPassword() is the method we added to User.js
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 6. Password matched — generate a JWT token for this user
    const token = generateToken(user._id);

    // 7. Send token and user info back to the client
    //    Client should store this token and send it with future requests
    res.status(200).json({
      message: "Login successful",
      token,               // the JWT token
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// 👇 Export both functions
module.exports = { signupUser, loginUser };
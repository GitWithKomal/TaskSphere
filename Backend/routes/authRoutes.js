// routes/authRoutes.js

const express = require("express");
const router = express.Router();

// 👇 import both controllers now
const { signupUser, loginUser } = require("../controllers/authController");

// POST /api/auth/signup
router.post("/signup", signupUser);

// POST /api/auth/login  👈 new
router.post("/login", loginUser);



module.exports = router;
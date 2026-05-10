// routes/userRoutes.js

const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

// GET /api/users/profile
// "protect" runs first — if it calls next(), the handler below runs
// if it blocks the request, the handler never runs
router.get("/profile", protect, async (req, res) => {

  // req.user was attached by the protect middleware
  // so we can safely use it here
  res.status(200).json({
    message: "Welcome to your profile",
    user: req.user, // contains id, name, email (no password)
  });

});

module.exports = router;
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.get("/profile", protect, async (req, res) => {
  res.status(200).json({
    message: "Welcome to your profile",
    user: req.user,
  });
});

module.exports = router;

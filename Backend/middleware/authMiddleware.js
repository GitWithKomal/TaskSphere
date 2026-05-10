// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/User");

// This middleware function protects any route it's attached to
const protect = async (req, res, next) => {

  let token;

  // 1. Check if the Authorization header exists and starts with "Bearer"
  //    Header looks like:  Authorization: Bearer eyJhbGci...
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Extract just the token part — split "Bearer <token>" and take index 1
      token = req.headers.authorization.split(" ")[1];

      // 3. Verify the token using your JWT_SECRET from .env
      //    If token was tampered with or expired, this throws an error
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //    decoded now looks like: { id: "665f...", iat: ..., exp: ... }

      // 4. Use the decoded userId to find the actual user in MongoDB
      //    .select("-password") means: return everything EXCEPT the password
      req.user = await User.findById(decoded.id).select("-password");
      //    Now req.user is available to any route handler that comes after

      // 5. Token is valid — move on to the actual route handler
      next();

    } catch (error) {
      // Token verification failed (expired, tampered, invalid)
      return res.status(401).json({ message: "Not authorized, token failed" });
    }

  }

  // 6. No token found in headers at all
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
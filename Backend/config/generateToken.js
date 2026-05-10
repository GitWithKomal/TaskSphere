// config/generateToken.js

const jwt = require("jsonwebtoken");

// Takes a userId and returns a signed JWT token
const generateToken = (userId) => {

  return jwt.sign(
    { id: userId },          // payload — data embedded inside the token
    process.env.JWT_SECRET,  // secret key from .env — used to sign & verify
    { expiresIn: "7d" }      // token expires after 7 days
  );
};

module.exports = generateToken;
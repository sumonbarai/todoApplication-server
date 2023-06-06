const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenCreate = (userData) => {
  const token = jwt.sign(userData, process.env.JWT_KEY, { expiresIn: "1h" });
  return token;
};

module.exports = tokenCreate;

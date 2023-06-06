const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenVerify = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      status: "fail",
      message: "unauthorized error",
    });
  }
  const token = authorization.split(" ")[1];

  // check token valid or not
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        status: "fail",
        message: "forbidden",
      });
    }
    req.headers.userId = decoded._id;
    req.headers.userName = decoded.name;
    next();
  });
};

module.exports = { tokenVerify };

// basic lib import
const express = require("express");
// const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const morgan = require("morgan");
// const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();

// security lib import
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const xssClean = require("xss-clean");

// public folder
app.use(express.static("/public"));

// security middleware implement
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(xssClean());

// request rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
// dev middleware implement
app.use(morgan("dev"));

// body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

// mongoDB connection
const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("mongoDb is successfully connected");
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });

// routing setup
app.get("/", (req, res) => {
  res.send("this is home page");
});

// 404 route
app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    msg: "foute not found",
  });
});

// error handle middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.status(500).send(err.message);
});

module.exports = app;

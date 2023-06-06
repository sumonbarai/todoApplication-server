const express = require("express");
const userController = require("../controllers/userController");
const status = require("../controllers/statusController");
const { tokenVerify } = require("../middlewares/tokenVerify");

const router = express.Router();

// status
router.get("/status", status);
// user
router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/selectProfile", tokenVerify, userController.selectProfile);
router.post("/updateProfile", tokenVerify, userController.updateProfile);

module.exports = router;

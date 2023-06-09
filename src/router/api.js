const express = require("express");
const userController = require("../controllers/userController");
const todoController = require("../controllers/todoController");
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

// todo route
router.post("/createTodo", tokenVerify, todoController.createTodo);
router.get("/getTodo", tokenVerify, todoController.getTodo);
router.get(
  "/getTodoByStatus/:status",
  tokenVerify,
  todoController.getTodoByStatus
);
router.get("/getTodoByDate", tokenVerify, todoController.getTodoByDate);
router.put("/updateTodo/:id", tokenVerify, todoController.updateTodo);

router.put(
  "/updateTodoStatus/:id",
  tokenVerify,
  todoController.updateTodoStatus
);

router.delete("/deleteTodo/:id", tokenVerify, todoController.deleteTodo);

module.exports = router;

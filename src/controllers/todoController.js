const mongooseErrorHandle = require("../utilities/errorHandle");
const TodoModel = require("../models/TodoModel");

module.exports.createTodo = async (req, res) => {
  try {
    const { userName } = req.headers;

    const postBody = {
      userName,
      ...req.body,
    };
    await TodoModel.create(postBody);
    res.status(201).json({
      status: "success",
      message: "Todo create successfully",
    });
  } catch (error) {
    mongooseErrorHandle(error, res);
  }
};

module.exports.getTodo = async (req, res) => {
  try {
    const { userName } = req.headers;

    const result = await TodoModel.find({ userName });
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    mongooseErrorHandle(error, res);
  }
};

module.exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    // for safety checking not update userName
    if ("userName" in updateData) {
      throw new Error("You are not allowed to update userName");
    }
    const result = await TodoModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "update success",
      data: result,
    });
  } catch (error) {
    mongooseErrorHandle(error, res);
  }
};

module.exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TodoModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).json({
        status: "fail",
        message: `${id} not found`,
      });
    }
    res.status(200).json({
      status: "success",
      message: `${id} has been successfully deleted`,
    });
  } catch (error) {
    mongooseErrorHandle(error, res);
  }
};

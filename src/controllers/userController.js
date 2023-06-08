const bcrypt = require("bcrypt");

const UserModel = require("../models/userModel");
const mongooseErrorHandle = require("../utilities/errorHandle");
const tokenCreate = require("../utilities/tokenCreate");

module.exports.register = async (req, res) => {
  try {
    const userData = req.body;

    const result = await UserModel.create(userData);

    if (result) {
      const { _id, email, phone, name } = result;
      const token = tokenCreate({ _id, name });
      res.status(201).json({
        status: "successfully create user",
        data: {
          _id,
          email,
          phone,
          token,
        },
      });
    }
  } catch (error) {
    mongooseErrorHandle(error, res);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.find({ email });
    if (user.length > 0 && user[0].email === email) {
      const match = bcrypt.compareSync(password, user[0].password);
      if (match) {
        const token = tokenCreate({ _id: user[0]._id, name: user[0].name });
        res.status(200).json({
          status: "successfully user login",
          data: {
            _id: user[0]._id,
            name: user[0].name,
            email: user[0].email,
            phone: user[0].phone,
            token,
          },
        });
      } else {
        res.status(400).json({
          status: "fail",
          message: "email address and password not match",
        });
      }
    } else {
      res.status(400).json({
        status: "fail",
        message: "email address and password not match",
      });
    }
  } catch (error) {
    mongooseErrorHandle(error, res);
  }
};

module.exports.selectProfile = async (req, res) => {
  try {
    const { userId } = req.headers;
    const result = await UserModel.findById(userId, { password: 0 });
    return res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.headers;

    const updateData = req.body;

    if ("name" in updateData) {
      throw new Error("You are not allowed to update user name");
    }

    const result = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
      select: { password: 0 },
    });

    res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    mongooseErrorHandle(error, res);
  }
};

const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "userName is required"],
    },
    subject: {
      type: String,
      trim: true,
      required: [true, "Todo Subject is required"],
      maxLength: 100,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
      enum: {
        values: ["new", "processing", "completed"],
        message: "{VALUE} is not supported",
      },
      default: "new",
    },
  },
  { timestamps: true, versionKey: false }
);

const TodoModel = mongoose.model("Todo", todoSchema);

module.exports = TodoModel;

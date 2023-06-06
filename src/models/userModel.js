const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email address is required"],
      unique: true,
    },
    phone: {
      type: String,
      validate: {
        validator: (v) => /^\+?(88)?0?1[3456789][0-9]{8}\b/.test(v),

        message: (props) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          `${props.value} is not a valid bangladeshi phone number`,
      },
      required: [true, "User phone number required"],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "password is required"],
      minLength: [8, "password must be have 8 length"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;

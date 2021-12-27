const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sche = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("user", sche);
module.exports = User;

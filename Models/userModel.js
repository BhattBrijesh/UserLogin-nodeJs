const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
  },
  { timestamps: true }
);
const userModel = mongoose.model("signUpData", userSchema);
module.exports = userModel;

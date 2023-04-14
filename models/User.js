const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required."],
  },
  email: {
    type: String,
    required: [true, "email is required."],
  },
  age: {
    type: String,
    required: [true, "age is required."],
  },
  password: {
    type: String,
    required: [true, "password is required."],
  },
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;

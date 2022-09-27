const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  middlename: { type: String },
  lastname: { type: String, required: true },
  dob: { type: String, required: true },
  mobile: { type: Number },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String },
  photo: { type: String },
  role: { type: String, default: "user" },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;

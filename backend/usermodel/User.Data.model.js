const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  label: { type: String, required: true },
  UserId: { type: String },
});

const UserDataModel =  mongoose.model("userdata", UserDataSchema);

module.exports = UserDataModel;

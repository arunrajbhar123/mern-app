const express = require("express");
const UserDataRouter = express.Router();
const DataFieldsRequired = require("../middleware/userdata/datafield.require");
const UserDataModel = require("../usermodel/User.Data.model");
const tokenDecrypt = require("../middleware/token.decrypt");
const addUserId = require("../middleware/userdata/addUserId.data");
UserDataRouter.get("/", tokenDecrypt, addUserId, async (req, res) => {
  const { UserId } = req.body;
  const data = await UserDataModel.find({ UserId }, { __v: 0 });
  res.send({ message: "successfull", data });
});
UserDataRouter.post(
  "/create",
  DataFieldsRequired,
  tokenDecrypt,
  addUserId,
  async (req, res) => {
    let { title, description, label, email, UserId } = req.body;
    label = label || "hi,guys";
    description = description || "System generated!";
    const newData = new UserDataModel({
      title,
      description,
      label,
      UserId,
    });
    await newData.save();
    res.send({ message: "post successfull", status: true, id: newData._id });
  }
);

UserDataRouter.patch(
  "/edit",
  DataFieldsRequired,
  tokenDecrypt,
  addUserId,
  async (req, res) => {
    const { UserId, title, description, label } = req.body;
    const postId = req.headers.postid;
    const data = await UserDataModel.findOne({_id:postId});
    data.title = title;
    data.description = description;
    data.label = label;
    await data.save();
    res.send({ message: "data update successfull", status: true });
  }
);
UserDataRouter.delete("/delete", tokenDecrypt, addUserId, async (req, res) => {
  const postId = req.headers.postid;

  const find = await UserDataModel.deleteOne({ _id: postId });
  if (find.deletedCount == 0) {
    return res.send({ message: "data not exist", status: false });
  }
  res.send({ message: "successfull delete data", status: true });
});

module.exports = UserDataRouter;

const express = require("express");
const tokenDecrypt = require("../middleware/token.decrypt");
const checkAdminOrNot = require("../middleware/admin/checkAdminOrNot");
const AdminRouter = express.Router();
const UserModel = require("../usermodel/User.Model");
const UserDataModel = require("../usermodel/User.Data.model");
AdminRouter.get(
  "/user/list",
  tokenDecrypt,
  checkAdminOrNot,
  async (req, res) => {
    const data = await UserModel.find({}, { password: 0, __v: 0 });
    res.send({ message: "successfull", data });
  }
);
AdminRouter.get(
  "/user/post",
  tokenDecrypt,
  checkAdminOrNot,
  async (req, res) => {
    const post = await UserDataModel.find();
    res.send({ message: "successfull", post });
  }
);

module.exports = AdminRouter;

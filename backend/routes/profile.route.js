const express = require("express");
const ProfileRouter = express.Router();
const UserModel = require("../usermodel/User.Model");
const tokenDecrypt = require("../middleware/token.decrypt");
ProfileRouter.get("/", tokenDecrypt, async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne(
    { email },
    { _id: 0, __v: 0, password: 0 }
  );
  res.send({ message: "Successfull", status: true, data: user });
});
module.exports = ProfileRouter;

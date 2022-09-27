const express = require("express");
const SignupRouter = express.Router();
const UserModel = require("../usermodel/User.Model");
const validationSignup = require("../middleware/validation.signup");
const passwordEncrypt = require("../middleware/password.encrypt");
const existOrNot = require("../middleware/existornot");
SignupRouter.post(
  "/",
  existOrNot,
  validationSignup,
  passwordEncrypt,
  async (req, res) => {
    const data = req.body;
    const newUser = new UserModel(data);
    await newUser.save();
    res.send({ message: "user register successfull", status: true });
  }
);

module.exports = SignupRouter;

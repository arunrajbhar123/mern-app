const express = require("express");
const LoginRoute = express.Router();
const checkExistUser = require("../middleware/loginExistCheck");
const passwordDecrypt = require("../middleware/password.decrypt");
const tokenGenerator = require("../middleware/token.generator");
const validationLogin = require("../middleware/validation.login");
LoginRoute.post(
  "/",
  validationLogin,
  checkExistUser,
  passwordDecrypt,
  tokenGenerator,
  (req, res) => {
    return res.send({
      message: "successfull",
      token: req.body.token,
      status: true,
    });
  }
);

module.exports = LoginRoute;

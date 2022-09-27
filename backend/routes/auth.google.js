const express = require("express");
const AuthGoogleRouter = express.Router();

const passport = require("../oauth/google.auth");

AuthGoogleRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

AuthGoogleRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  function (req, res) {
    const { name, given_name, family_name, picture, email } =
      req?.user?.profile?._json;
    const token = req?.user.token;

    const userDetails = {
      firstname: given_name,
      lastname: family_name,
      dob:"01-01-1998",
      email: email,
      password: 5462,
      photo: picture,
    };
    res.redirect("/");
  }
);

module.exports = AuthGoogleRouter;

const validationLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (email == undefined && password == undefined) {
    return res.send({
      message: "please fill the all required fields",
      status: false,
    });
  }
  return next();
};

module.exports = validationLogin;

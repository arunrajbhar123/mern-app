const UserModel = require("../usermodel/User.Model");
const emailCheckresSetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  console.log(user?._id);
  if (user?._id === undefined) {
    return res.send({
      message: "Email is not register please try correct email",
      status: false,
    });
  }
  next();
};

module.exports = emailCheckresSetPassword;

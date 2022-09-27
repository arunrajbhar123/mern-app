const UserModel = require("../usermodel/User.Model");
const existOrNot = async (req, res, next) => {
  const { email } = req.body;
  const status = await UserModel.find({ email });
  if (status.length !== 0) {
    return res.send({ message: "user is already exist", status: false });
  }
  next();
};
module.exports = existOrNot;

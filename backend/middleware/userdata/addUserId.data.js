const UserModel = require("../../usermodel/User.Model");
const addUserId = async (req, res, next) => {
  const { email } = req.body;
  const { _id } = await UserModel.findOne({ email });
  req.body.UserId = _id;
  next();
};

module.exports = addUserId;

const bcrypt = require("bcrypt");
const UserModel = require("../usermodel/User.Model");
const passwordDecrypt = async (req, res, next) => {
  const { password, email } = req.body;
  const hash = await UserModel.findOne({ email });
  bcrypt.compare(password, hash.password).then(function (result) {
    if (result) {
      return next();
    }
    return res.send({ message: "Invalid Credentials", status: false });
  });
};
module.exports = passwordDecrypt;

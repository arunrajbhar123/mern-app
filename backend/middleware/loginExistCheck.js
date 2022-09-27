const UserModel = require("../usermodel/User.Model");
const checkExistUser = async (req, res, next) => {
  const { email } = req.body;
  const status = await UserModel.find({ email });
  
  if (status.length == 0) {
    return res.send({message:"user is not exist",status:false});
  }
  return next();
};


module.exports=checkExistUser
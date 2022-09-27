const UserModel = require("../../usermodel/User.Model");

const checkAdminOrNot =async (req, res, next) => {
    const {email}=req.body;
    const {role}=await UserModel.findOne({email})
    if(role!=="admin"){
       return  res.send({message:"unauthorized" ,status:false})
    }
    next()
};
module.exports=checkAdminOrNot;
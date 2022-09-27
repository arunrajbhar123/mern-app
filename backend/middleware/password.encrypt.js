const bcrypt = require("bcrypt");
const passwordEncrypt = (req, res, next) => {
 
  bcrypt.hash(req.body.password, 8, function (err, hash) {
    if (err) {
      return res.send({
        message: "Please try again password wala me pro",
        status: false,
      });
    }
    req.body.password = hash;
   return next();
  });
};
module.exports = passwordEncrypt;

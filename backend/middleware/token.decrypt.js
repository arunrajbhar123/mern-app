const jwt = require("jsonwebtoken");
const tokenDecrypt = (req, res, next) => {
  const token = req.headers.authentication;

  jwt.verify(token, "mernapp", function (err, decoded) {
    if (err) {
      return res.send({ message: "unauthorized",status:false });
    }
    req.body.email = decoded.email;
  return  next()
  });
};

module.exports = tokenDecrypt;

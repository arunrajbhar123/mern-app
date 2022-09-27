const jwt = require("jsonwebtoken");

const tokenGenerator = (req, res, next) => {
  const { email } = req.body;
  jwt.sign(
    { email },
    "mernapp",
    function (err, token) {
      if (err) {
        return res.send({ message: "something is wrong please try again" });
      }
      req.body.token = token;
      return next();
    },
    { expiresIn: "6h" }
  );
};

module.exports = tokenGenerator;

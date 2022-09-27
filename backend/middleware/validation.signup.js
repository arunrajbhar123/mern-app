const validationSignup = (req, res, next) => {
  const {
    firstname,
    middlename,
    lastname,
    dob,
    mobile,
    email,
    password,
    address,
    photo,
  } = req.body;
  if (
    firstname !== undefined &&
    lastname !== undefined &&
    dob !== undefined &&
    email !== undefined &&
    password !== undefined
  ) {
    return next();
  }

  return res.send({ message: "please fill the all require feilds", status: false });
};

module.exports = validationSignup;

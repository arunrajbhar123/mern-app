const DataFieldsRequired = (req, res, next) => {
  const { title, description, label } = req.body;
  
  if (title !== undefined && description !== undefined && label !== undefined) {
    return next();
  } else {
    res.send({
      message: "please fill the all required fields",
      status: false,
    });
  }
};
module.exports = DataFieldsRequired;

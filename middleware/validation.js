const { validationResult } = require("express-validator");
const isEmpty = require("is-empty");

module.exports = async (req, res, next) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next({
      status: 400,
      message: errors.array(),
    });
  }
  next();
};

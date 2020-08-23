const { validationResult } = require("express-validator");

module.exports = async (req, res, next) => {
  errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg));

  return next({
    status: 400,
    message: extractedErrors,
  });
};

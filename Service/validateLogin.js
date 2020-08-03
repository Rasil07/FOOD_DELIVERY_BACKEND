const validator = require("validator");
const isempty = require("is-empty");
module.exports = function validateLogin(req, res, next) {
  const email = "" + req.body.email;
  const password = "" + req.body.password;

  const error = {};

  if (!validator.isEmail(email)) {
    error.email = "Invalid email";
  }
  if (validator.isEmpty(password)) {
    error.password = "Please enter your password";
  }

  const isvalid = isempty(error);
  if (isvalid === true) {
    return next();
  }
  return res.status(400).json({ success: false, message: error });
};

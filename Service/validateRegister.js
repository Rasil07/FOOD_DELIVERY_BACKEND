const validator = require("validator");
const isempty = require("is-empty");
module.exports = function validateRegistration(req, res, next) {
  const name = "" + req.body.name;
  const email = "" + req.body.email;
  const password = "" + req.body.password;
  const confirm_password = "" + req.body.cpassword;
  const address = "" + req.body.address;
  const contact_no = "" + req.body.contact_no;

  const error = {};

  if (validator.isEmpty(name)) {
    error.name = "Name is required";
  }
  if (validator.isEmpty(contact_no)) {
    error.contact_number = "Contact number is required";
  }
  if (!validator.isLength(contact_no, { min: 10, max: 10 })) {
    error.contact_number = "Number must contain exacatly 10 digits";
  }
  if (validator.isEmpty(address)) {
    error.name = "Address is required";
  }
  if (!validator.isEmail(email)) {
    error.email = "Invalid email";
  }
  if (!validator.isLength(password, { min: 6, max: 32 })) {
    error.password = "Password must contain atleast 8 characters";
  }
  if (password !== confirm_password) {
    error.password = "Confirmation password should match password";
  }
  const isvalid = isempty(error);
  if (isvalid === true) {
    return next();
  }
  return res.status(400).json({ success: false, message: error });
};

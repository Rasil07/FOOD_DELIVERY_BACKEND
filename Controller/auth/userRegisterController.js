const User = require("../../Model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports = async (req, res, next) => {
  try {
    let { name, email, password, cpassword, address, contact_no } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return next({
        status: 400,
        message: [{ msg: "User already registered!!!" }],
      });
    }
    let hash = await bcrypt.hash(password, saltRounds);
    if (!hash) {
      return next({
        status: 400,
        message: [{ msg: "Hash not  generated" }],
      });
    }
    let newUser = new User({
      name: name,
      email: email,
      password: hash,
      address: address,
      contact_no: contact_no,
    });
    let userSaved = await newUser.save();
    if (!userSaved) {
      return next({
        status: 400,
        message: [
          { msg: "Could not register user properly. Please try again." },
        ],
      });
    }
    req.body = { user: newUser };
    next();
  } catch (error) {
    return next({
      status: 400,
      message: [{ msg: error.message }],
    });
  }
};

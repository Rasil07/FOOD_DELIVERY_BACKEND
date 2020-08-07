const User = require("../../Model/User");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  //try block starts
  try {
    let user = await User.findOne({ email: email });

    if (!user) {
      return next({
        status: 404,
        message: [{ msg: "User doesnt exists" }],
      });
    }
    let matches = await bcrypt.compare(password, user.password);

    if (matches) {
      req.body = { user: user };
      next();
    }
    return next({
      status: 400,
      message: [{ msg: "Invalid credentials" }],
    });
  } catch (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};

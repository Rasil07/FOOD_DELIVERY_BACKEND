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
        message: ["User doesnt exists"],
      });
    }
    let matches = await bcrypt.compare(password, user.password);

    if (!matches) {
      return next({
        status: 400,
        message: ["Invalid credentials"],
      });
    }
    req.body = { user: user };
    return next();
  } catch (error) {
    return next({
      status: 400,
      message: [error.message],
    });
  }
};

const jwt = require("jsonwebtoken");
const config = require("../config");
const secret = config.development.secret;
module.exports = async (req, res, next) => {
  let user = req.body.user;
  try {
    let token = jwt.sign(
      { data: { id: user._id, name: user.name, isAdmin: user.admin } },
      secret,
      {
        expiresIn: "2h",
      }
    );

    return res.status(200).json({ token: token, message: "Login Succesful" });
  } catch (error) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};

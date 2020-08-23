const jwt = require("jsonwebtoken");
const config = require("../config");

const secret = config.development.secret;
module.exports = function decodeToken(req, res) {
  let token = req.body.headers["auth-token"];

  if (!token) {
    return next({
      status: 400,
      message: [{ msg: "No auth token present" }],
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return next({
        status: 400,
        message: [{ msg: `${err.message}` }],
      });
    }
    return res.status(200).json({ decoded: decoded });
  });
};

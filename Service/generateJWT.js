const jwt = require("jsonwebtoken");
const secret = process.env.jwtSecret;
module.exports = function generateToken(user, res) {
  return jwt.sign(
    { data: { id: user._id, name: user.name, isAdmin: user.admin } },
    secret,
    {
      expiresIn: "2h",
    }
  );
};

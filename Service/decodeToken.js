const jwt = require("jsonwebtoken");
const secret = process.env.jwtSecret;
module.exports = function decodeToken(req, res) {
  let token = req.body.headers["auth-token"];

  if (!token) {
    return res.status(404).json({ message: "No auth token present" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    }
    return res.status(200).json({ decoded: decoded });
  });
};

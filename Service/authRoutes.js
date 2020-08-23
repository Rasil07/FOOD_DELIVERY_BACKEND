const jwt = require("jsonwebtoken");
const config = require("../config/");

const secret = config.development.secret;

function adminAuthRoutes(req, res, next) {
  if (!req.body.headers) {
    return res.status(404).json({ message: "No auth token present" });
  }
  let token = req.body.headers["auth-token"];
  if (!token) {
    return res.status(404).json({ message: "No auth token present" });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    }
    if (decoded) {
      //   console.log(decoded);
      if (decoded.data.isAdmin === true) {
        next();
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }
  });
}
function loggedUserAuth(req, res, next) {
  if (!req.body.headers) {
    return res.status(404).json({ message: "No auth token present" });
  }
  let token = req.body.headers["auth-token"];
  if (!token) {
    return res.status(404).json({ message: "No auth token present" });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    }
    if (decoded) {
      next();
    }
  });
}
module.exports = { adminAuthRoutes, loggedUserAuth };

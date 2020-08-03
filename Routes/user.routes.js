const express = require("express");
const router = express.Router();
const { login, register } = require("../Controller/userController");
const decodeToken = require("../Service/decodeToken");
const validateRegistration = require("../Service/validateRegister");

const validateLogin = require("../Service/validateLogin");
router.post("/register", validateRegistration, (req, res) => {
  register(req, res);
});
router.post("/login", validateLogin, (req, res) => {
  login(req, res);
});
router.post("/decode", (req, res) => {
  decodeToken(req, res);
});

module.exports = router;

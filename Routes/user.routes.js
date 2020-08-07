const router = require("express").Router();
const { check, body } = require("express-validator");

const { login, register } = require("../Controller");

const decodeToken = require("../Service/decodeToken");

const validate = require("../middleware/validation");
const generateToken = require("../middleware/generateJWT");

router.route("/register").post(
  [
    body("name").notEmpty().withMessage("Name is required!!!"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password", "Password must contain atleast 8 characters")
      .isLength({
        min: 8,
      })
      .custom((value, { req, loc, path }) => {
        if (value !== req.body.confirm_password) {
          throw new Error("Passwords don't match");
        } else {
          return value;
        }
      }),
    body("address").notEmpty().withMessage("Address field in empty"),
    body("contact_no", "Invalid contact number ")
      .matches(/9[0-8][0-9]{8}/)
      .isLength({ min: 10, max: 10 }),
  ],
  validate,
  register,
  generateToken
);

router
  .route("/login")
  .post(
    [
      body("email")
        .notEmpty()
        .withMessage("Email is required!!")
        .isEmail()
        .withMessage("Enter valid email!!!"),
      body("password", "Password is required!!!").notEmpty(),
    ],
    validate,
    login,
    generateToken
  );

router
  .route("/decode")
  .post(
    [
      body("headers.auth-token")
        .notEmpty()
        .withMessage("No Authentication Found"),
    ],
    validate,
    decodeToken
  );

module.exports = router;

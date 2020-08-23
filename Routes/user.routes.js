const router = require("express").Router();
const { check, body } = require("express-validator");

const { login, register } = require("../Controller/auth/");

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
    body("contact_no")
      .matches(/9[0-8][0-9]{8}/)
      .withMessage("The number is invalid")
      .isLength({ min: 10, max: 10 })
      .withMessage("Contact number must contain exact 10 didgits"),
  ],
  validate,
  register,
  generateToken
);

router
  .route("/login")
  .post(
    [
      check("email").notEmpty().withMessage("Email field is empty."),
      check("email").isEmail().withMessage("Enter valid email!!!"),
      check("password", "Password is required!!!").notEmpty(),
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

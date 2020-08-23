const express = require("express");
const router = express.Router();
const { saveOrder } = require("../Controller/order");
const { check, body } = require("express-validator");
const validate = require("../middleware/validation");

router
  .route("/")
  .post(
    [
      body("user_id").notEmpty().withMessage("User is not present"),
      body("items")
        .notEmpty()
        .withMessage("No items in Cart!!! Please place your order first"),
    ],
    validate,
    saveOrder
  );

module.exports = router;

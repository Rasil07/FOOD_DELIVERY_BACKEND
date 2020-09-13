const express = require("express");
const router = express.Router();
const { saveOrder, getAllOrder, deleteOrder } = require("../Controller/order");
const { check, body } = require("express-validator");
const validate = require("../middleware/validation");
const { loggedUserAuth, adminAuthRoutes } = require("../Service/authRoutes");

router
  .route("/")
  .post(
    loggedUserAuth,
    [
      body("user_id").notEmpty().withMessage("User is not present"),
      body("items")
        .notEmpty()
        .withMessage("No items in Cart!!! Please place your order first"),
    ],
    validate,
    saveOrder
  );

router.route("/").get(adminAuthRoutes, getAllOrder);
router.route("/:id").delete(adminAuthRoutes, deleteOrder);

module.exports = router;

const upload = require("../middleware/multerUploader");
const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");
const validate = require("../middleware/validation");
const { adminAuthRoutes, loggedUserAuth } = require("../Service/authRoutes");
const {
  getDish,
  addDish,
  deleteDish,
  editDish,
} = require("../Controller/dish/");

//gets all dishes
router.route("/").get(getDish);

//route for adding dishes
router.route("/add").post(
  // [
  //   body("name").notEmpty().withMessage("Name of dish is required"),
  //   body("category").notEmpty().withMessage("Category of dish is required"),
  //   body("price").notEmpty().withMessage("Price of dish os required"),
  // ],
  // validate,
  upload.upload.single("image"),
  addDish
);

//route for delete dish
router.route("/delete/:id").post(adminAuthRoutes, deleteDish);

//route for editing dishes
router.route("/edit/:id").post(adminAuthRoutes, editDish);

module.exports = router;

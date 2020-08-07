const express = require("express");
const router = express.Router();
const { adminAuthRoutes, loggedUserAuth } = require("../Service/authRoutes");
const {
  getDishes,
  addDishes,
  deleteDish,
  updateDish,
  orderDish,
} = require("../Controller/dish/dishController");
router.get("/", (req, res) => {
  getDishes(req, res);
});
router.get("/", (req, res) => {
  getDishes(req, res);
});

router.post("/add", adminAuthRoutes, (req, res) => {
  addDishes(req, res);
});
router.post("/order", loggedUserAuth, (req, res) => {
  orderDish(req, res);
});
router.post("/delete/:id", adminAuthRoutes, (req, res) => {
  deleteDish(req, res);
});
router.post("/edit/:id", adminAuthRoutes, (req, res) => {
  updateDish(req, res);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Dish = require("../Model/Dish");

router.post("/add", (req, res) => {
  console.log("Dish add route");
});

module.exports = router;

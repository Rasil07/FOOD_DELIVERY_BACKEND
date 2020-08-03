const express = require("express");
const router = express.Router();

router.post("/add", (req, res) => {
  console.log("Dish add route");
});

module.exports = router;

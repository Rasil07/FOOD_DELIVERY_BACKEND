const router = require("express").Router();
router.user = require("./user.routes");
router.dish = require("./dish.routes");
router.order = require("./order.routes");
module.exports = router;

const Order = require("../../Model/Order");

module.exports = async (req, res, next) => {
  try {
    let orders = await Order.find({})
      .populate("ordered_by", "name contact_no")
      .populate("order_list.items.dishId", "name category price");

    if (!orders) {
      return next({
        status: 400,
        message: ["Dishes not found"],
      });
    }
    return res.status(200).json({ orders });
  } catch (err) {
    return next({
      status: 400,
      message: err,
    });
  }
};

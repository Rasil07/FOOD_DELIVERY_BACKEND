const Order = require("../../Model/Order");

module.exports = async (req, res, next) => {
  try {
    let { id } = req.params;
    let order = await Order.findOne({ _id: id });
    if (!order) {
      return next({
        status: 404,
        message: ["Order not found!!!"],
      });
    }
    let deleteOrder = await order.remove();
    if (!deleteOrder) {
      return next({
        status: 400,
        message: ["Failed to delete order. Please try again"],
      });
    }
    res.status(200).json({ message: ["Order succesfully deleted."] });
    return next();
  } catch (error) {
    return next({
      status: 400,
      message: [error.message],
    });
  }
};

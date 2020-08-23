const Order = require("../../Model/Order");
const User = require("../../Model/User");
const Dish = require("../../Model/Dish");

module.exports = async (req, res, next) => {
  //try block start
  try {
    const userId = req.body.userId;
    const itemArray = req.body.items;
    const total_price = req.body.totalPrice;

    //init new doc
    let newOrder = new Order({
      ordered_by: userId,
      total_price: total_price,
    });

    newOrder.order_list = { items: [] };

    //loop through all dishes in order
    for (var item of itemArray) {
      newOrder.order_list.items.push({
        dishId: item._id,
        quantity: item.quantity,
      });
    }

    //save the order
    let savedOrder = await newOrder.save();

    //Error handler
    if (!savedOrder) {
      return next({
        status: 400,
        message: [{ msg: "Order didnt save properly. Please try again.." }],
      });
    }

    return res.status(200).json({ message: "Order Saved properly" });

    //EOF try block
  } catch (error) {
    return next({
      status: 400,
      message: [{ msg: error.message }],
    });
  }
};

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newOrderSchema = new Schema({
  ordered_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  order_list: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: "Dish",
      },
    },
  ],
  ordered_date: {
    type: Date,
    default: Date.now,
  },
  delivery_status: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model("Order", newOrderSchema);
module.exports = Order;

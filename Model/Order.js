const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newOrderSchema = new Schema({
  ordered_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  order_list: {
    items: [
      {
        dishId: { type: Schema.Types.ObjectId, ref: "Dish" },

        quantity: { type: String, required: true },
      },
    ],
  },

  ordered_date: {
    type: Date,
    default: Date.now,
  },
  delivery_status: {
    type: Boolean,
    default: false,
  },
  total_price: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", newOrderSchema);
module.exports = Order;

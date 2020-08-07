const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newDishSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: mongoose.Number,
    required: true,
  },
});

const Dish = mongoose.model("Dish", newDishSchema);

module.exports = Dish;

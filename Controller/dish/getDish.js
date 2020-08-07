const Dish = require("../../Model/Dish");

//get all dishes
module.exports = async (req, res) => {
  Dish.find({}, (err, docs) => {
    if (err) {
      return res.status(404).json({ message: err.message });
    } else {
      return res.status(200).json({ dishes: docs });
    }
  });
  //   return res.status(200).json({ message: "Dishes" });
};

const Dish = require("../../Model/Dish");

//order dish
async function orderDish(req, res) {
  return res.status(200).json({ message: "Dishes" });
}

//add dish
async function addDishes(req, res) {
  //   return res.status(200).json({ message: req.body });
  const dish = new Dish({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
  });
  dish.save((err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(200).json({ message: `${dish.name} added!!!` });
  });
}

//delet dish
async function deleteDish(req, res) {
  const dish = Dish.findOne({ _id: req.params.id }, (err, dishData) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    } else if (!dishData) {
      return res.status(404).json({ message: "Dish doesnt exist." });
    }
    dish.remove((err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      return res.status(200).json({ message: ` deleted!!` });
    });
  });
}

//update dish
async function updateDish(req, res) {
  return res.status(200).json({ message: "updateDish" });
}

module.exports = { getDishes, orderDish, addDishes, deleteDish, updateDish };

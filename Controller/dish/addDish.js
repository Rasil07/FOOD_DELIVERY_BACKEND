const Dish = require("../../Model/Dish");

//get all dishes
module.exports = async (req, res) => {
  const { name, category, price } = req.body;
  try {
    let dish = await Dish.findOne({ name });
    if (dish) {
      return next({
        status: 400,
        message: [{ msg: "Dish already exists!!!" }],
      });
    }

    let newDish = new Dish({
      name,
      category,
      price,
    });

    let dishSaved = await newDish.save();

    if (!dishSaved) {
      return next({
        status: 400,
        message: [{ msg: "Dish is not saved properly. Please try again." }],
      });
    }
    return res
      .status(200)
      .json({ message: [{ msg: `${newDish.name} saved successfully` }] });
  } catch (error) {
    return next({
      status: 400,
      message: [{ msg: err.message }],
    });
  }
};

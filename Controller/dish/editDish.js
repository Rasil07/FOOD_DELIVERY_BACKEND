const Dish = require("../../Model/Dish");

module.exports = async (req, res, next) => {
  const { id } = req.params;
  let { name, category, price } = req.body;

  try {
    let dish = await Dish.findOne({ _id: id });

    if (!dish) {
      return next({
        status: 404,
        message: [{ msg: "Dish is not found!!!" }],
      });
    }

    let editDish = await Dish.findOneAndUpdate(
      { _id: id },
      { name, category, price }
    );
    if (!editDish) {
      return next({
        status: 400,
        message: [{ msg: "Dish is not updated!!! Please try again" }],
      });
    }
    return res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    return next({
      status: 400,
      message: [{ msg: error.message }],
    });
  }
};

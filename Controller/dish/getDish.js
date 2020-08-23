const Dish = require("../../Model/Dish");

//get all dishes
module.exports = async (req, res, next) => {
  try {
    let dishes = await Dish.find({});

    if (!dishes) {
      return next({
        status: 400,
        message: [{ msg: "Dishes not found" }],
      });
    }
    return res.status(200).json({ dishes });
  } catch (error) {
    return next({
      status: 400,
      message: [{ msg: error.message }],
    });
  }
};

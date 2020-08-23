const Dish = require("../../Model/Dish");

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    let dish = await Dish.findOne({ _id: id });
    if (!dish) {
      return next({
        status: 404,
        message: ["Dish doesnot exist"],
      });
    }
    let dishRemoved = await dish.remove();
    if (!dishRemoved) {
      return next({
        status: 400,
        message: ["Dish is not removed. Please try again"],
      });
    }
    return res.status(200).json({
      message: "Successfully Removed",
    });
    next();
  } catch (error) {
    return next({
      status: 400,
      message: [error.message],
    });
  }
};

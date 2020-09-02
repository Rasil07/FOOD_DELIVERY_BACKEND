const fs = require("fs");
const Dish = require("../../Model/Dish");
const { promisify } = require("util");
module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    let dish = await Dish.findOne({ _id: id });
    let imagePath = JSON.stringify(dish.image);
    if (imagePath) {
      let arrays = imagePath.split("/");
      let image = arrays.pop().split('"')[0];
      await promisify(fs.unlink)(`upload/${image}`);
    }

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
  } catch (error) {
    return next({
      status: 400,
      message: [error.message],
    });
  }
};

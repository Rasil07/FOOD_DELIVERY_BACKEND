const Dish = require("../../Model/Dish");
const { promisify } = require("util");
const deleteImage = require("../../utils/deleteImage");
//get all dishes
module.exports = async (req, res, next) => {
  const { name, category, price } = req.body;
  if (!req.file) {
    return next({
      status: 400,
      message: ["Please add image."],
    });
  }
  const imageName = req.file.filename;
  const image = `http://localhost:5000/upload/${imageName}`;

  try {
    let dish = await Dish.findOne({ name });
    if (dish) {
      await deleteImage(imageName);
      return next({
        status: 400,
        message: ["Dish already exists!!!"],
      });
    }
    let newDish = new Dish({
      name,
      category,
      price,
      image,
    });
    let dishSaved = await newDish.save();
    if (!dishSaved) {
      await deleteImage(imageName);
      return next({
        status: 400,
        message: ["Dish is not saved properly. Please try again."],
      });
    }
    return res
      .status(200)
      .json({ message: [`${newDish.name} saved successfully`] });
  } catch (error) {
    await deleteImage(imageName);
    return next({
      status: 400,
      message: [error.message],
    });
  }
};

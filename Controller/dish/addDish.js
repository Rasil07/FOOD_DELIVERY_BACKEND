const Dish = require("../../Model/Dish");

//get all dishes
module.exports = async (req, res, next) => {
  // console.log(req.file, req.body);
  const { name, category, price } = req.body;
  const imageName = req.file.filename;
  const image = `http://localhost:5000/upload/${imageName}`;
  try {
    let dish = await Dish.findOne({ name });
    if (dish) {
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
      return next({
        status: 400,
        message: ["Dish is not saved properly. Please try again."],
      });
    }
    return res
      .status(200)
      .json({ message: [`${newDish.name} saved successfully`] });
  } catch (error) {
    return next({
      status: 400,
      message: [error.message],
    });
  }
};

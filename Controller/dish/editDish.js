const Dish = require("../../Model/Dish");
const deleteImage = require("../../utils/deleteImage");
module.exports = async (req, res, next) => {
  const { id } = req.params;
  let { name, category, price } = req.body;
  // console.log(id, name, category, price, req.file);

  try {
    let dish = await Dish.findOne({ _id: id });

    if (!dish) {
      return next({
        status: 404,
        message: ["Dish is not found!!!"],
      });
    }

    if (req.file !== undefined) {
      const imageName = req.file.filename;
      let image = `http://localhost:5000/upload/${imageName}`;
      let doc = await Dish.findOne({ _id: id });
      doc.name = name;
      doc.category = category;
      doc.price = price;
      let imagePath = JSON.stringify(doc.image);
      let arrays = imagePath.split("/");
      let prevImage = arrays.pop().split('"')[0];

      await deleteImage(prevImage);
      doc.image = image;
      editDish = await doc.save();
      if (!editDish) {
        return next({
          status: 400,
          message: ["Dish is not updated!!! Please try again"],
        });
      }
      return res.status(200).json({ message: ["Successfully updated"] });
    } else {
      const doc = await Dish.findOne({ _id: id });
      let image = doc.image;
      let editDish = await Dish.findOneAndUpdate(
        { _id: id },
        { name, category, price, image }
      );
      if (!editDish) {
        return next({
          status: 400,
          message: ["Dish is not updated!!! Please try again"],
        });
      }
      return res.status(200).json({ message: ["Successfully updated"] });
    }
  } catch (error) {
    return next({
      status: 400,
      message: [error.message],
    });
  }
};

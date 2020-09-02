const { validationResult } = require("express-validator");
const deleteImage = require("../utils/deleteImage");
module.exports = async (req, res, next) => {
  errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg));
  if (req.file) {
    let image = req.file.filename;
    await deleteImage(image);
  }
  return next({
    status: 400,
    message: extractedErrors,
  });
};

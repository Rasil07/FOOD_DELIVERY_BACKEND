const { promisify } = require("util");
const fs = require("fs");

const deleteImage = async (image) => {
  await promisify(fs.unlink)(`upload/${image}`);
};

module.exports = deleteImage;

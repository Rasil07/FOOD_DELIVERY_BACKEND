require("dotenv/config");

const config = {
  development: {
    mongoURI: process.env.MONGO_URI_DEV,
    secret: process.env.JWT_SECRET,
  },
};
module.exports = config;

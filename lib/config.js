// const dotenv = require("dotenv");
// dotenv.config();

require("dotenv").config();

exports.env = {
  PORT: process.env.PORT || 3005,
  MONGO_URI: process.env.MONGO_URI,
  DB_NAME: process.env.DB,
};

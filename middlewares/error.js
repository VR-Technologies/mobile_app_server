const { compareSync } = require("bcryptjs");
const constant = require("../utils/constant");

const errorHandler = (err, req, res, next) => {
  console.log("err", err);
  res.status(err.statusCode || 500).json({
    responseCode: err.responseCode,
    message: err.message || "Server Error",
  });
};

module.exports = errorHandler;

const logger = (req, res, next) => {
  console.log("here in logger");
  next();
};

module.exports = logger;

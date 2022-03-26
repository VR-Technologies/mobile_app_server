const profileJson = require("../templates/profile.json");

exports.getProfileDetails = (req, res, next) => {
  res.status(200).json(profileJson);
};

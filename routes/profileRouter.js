const express = require("express");
const profileRouter = express.Router();
const { getProfileDetails } = require("../controller/profile");

profileRouter.get("/getDetails", getProfileDetails);

module.exports = profileRouter;

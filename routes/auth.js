const express = require("express");
const AuthRouter = express.Router();
const { register, signin } = require("../controller/auth");

AuthRouter.post("/signUp", register);

AuthRouter.post("/signIn", signin);

module.exports = AuthRouter;

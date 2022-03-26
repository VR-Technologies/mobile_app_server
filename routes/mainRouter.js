const express = require("express");
const profileRouter = require("./profileRouter");
const deviceRouter = require("../routes/deviceRouter");
const AuthRouter = require("../routes/auth");
const mainRouter = express();
const productRouter = require("../routes/productRouter");

mainRouter.use("/profile", profileRouter);

mainRouter.use("/device", deviceRouter);

mainRouter.use("/product", productRouter);

mainRouter.use("/", AuthRouter);

module.exports = mainRouter;

// router.get("/home/:id", routeHome);

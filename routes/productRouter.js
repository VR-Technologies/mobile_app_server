const express = require("express");
const productRouter = express.Router();
const {getproductList,getproductInfo} = require('../controller/product')

productRouter.get("/list", getproductList);

// productRouter.get("/list", getproductInfo);

module.exports = productRouter;
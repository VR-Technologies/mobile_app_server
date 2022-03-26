const productListJson = require('../templates/productList.json');
const productInfoJson = require('../templates/productInfo.json');

exports.getproductList = (req, resp, next) => {
    if (req.query) {
        resp.status(200).json(productInfoJson)
    } else {
        resp.status(200).json(productListJson)   
    }
}
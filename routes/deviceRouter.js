const express = require("express");
const deviceRouter = express.Router();

deviceRouter.get("/", (req, resp) => {
  resp.send("from device");
});

module.exports = deviceRouter;

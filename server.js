const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
// const morgan = require("morgan");
var bodyParser = require("body-parser");
const colors = require("colors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const mainRouter = require("./routes/mainRouter");
const errorHandler = require("./middlewares/error");
// const logger = require("../utilities/logger");

const server = express();

// parse application/x - www - form - urlencoded;
server.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
server.use(bodyParser.json());

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Cookie parser
server.use(cookieParser());

connectDB();

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "developement") {
  // server.use(morgan("dev"));
}

server.use("/api/v1", mainRouter);

server.use(errorHandler);

const serve = server.listen(
  port,
  console.log(
    `Server running on in ${process.env.NODE_ENV} mode on port ${port}`
      .underline.yellow
  )
);

//handle unhandled promise rejections

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:${err.message}`);
  serve.close(() => process.exit(1));
});

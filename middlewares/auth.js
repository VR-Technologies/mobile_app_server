const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token =
      req.headers.authorizatio.split(" ") &&
      req.headers.authorizatio.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({
      responseCode: "99",
      errorMessage: "Not authorize to access this page",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    const user = await User.findById(decode.id);
    console.log("user", user);
  } catch (err) {
    res.status(401).json({
      responseCode: "99",
      errorMessage: "Not authorize to access this page",
    });
  }
};

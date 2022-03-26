const User = require("../models/User");
const bCypts = require("bcryptjs");
const { use } = require("../routes/auth");
const CustomErrorResponse = require("../utils/customErrorResponse");
const constant = require("../utils/constant");
const CustomSuccessResponse = require("../utils/custonSuccessResponse");

exports.register = async (req, res, next) => {
  //@desc  register user
  //@route /api/v1/auth/login
  //method POST
  const { username, password, email, role, createdAt } = req.body;
  try {
    console.log("here");
    const user = await User.create({
      username,
      password,
      email,
      role,
      createdAt,
    });

    console.log("user", user.getSingnedJWTToken());

    const token = user.getSingnedJWTToken();

    res.status(200).json({
      responseCode: 00,
      message: "Register successfull",
      token: token,
    });
  } catch (err) {
    if (!email || !password) {
      next(
        new CustomErrorResponse(
          "Please add email or password",
          constant.success,
          constant.validationFail
        )
      );
    } else if (!username) {
      next(
        new CustomErrorResponse(
          "Username is not valid",
          constant.success,
          constant.validationFail
        )
      );
    } else {
      next(
        new CustomErrorResponse(
          "email or password is not valid. Please try again",
          constant.success,
          constant.validationFail
        )
      );
    }
  }
};

exports.signin = async (req, res, next) => {
  //@desc  Login user
  //@route /api/v1/auth/login
  //method POST

  const { email, password } = req.body;

  // validate email and password
  try {
    if (!email || !password) {
      next(
        new CustomErrorResponse(
          "Please provide an email and password",
          constant.success,
          constant.validationFail
        )
      );
    } else if (email && !password) {
      next(
        new CustomErrorResponse(
          "Invalid credentials",
          constant.success,
          constant.validationFail
        )
      );
    } else if (email && password) {
      const user = await User.findOne({ email }).select("+password");
      if (user) {
        const isMatch = await user.isMatchPassword(password);
        if (!isMatch) {
          new CustomErrorResponse(
            "Invalid credentials",
            constant.success,
            constant.validationFail
          );
        } else {
          const token = user.getSingnedJWTToken();
          // res.status(200).json({
          //   responseCode: "00",
          //   success: true,
          //   loggedIn: true,
          //   token: token,
          // });
          sendTokenResponse(user, 200, res, process);
        }
      } else {
        new CustomErrorResponse(
          "No user found",
          constant.success,
          constant.validationFail
        );
      }

      //check if password  matches
    }
  } catch (err) {
    next(new CustomErrorResponse(err.message, 500));
  }

  // check for user
};

// Get Token from model, create cookie and send response

const sendTokenResponse = (user, statuCode, res, process) => {
  const token = user.getSingnedJWTToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statuCode).cookie("token", token, options).json({
    responseCode: "00",
    success: true,
    loggedIn: true,
    token: token,
  });
};

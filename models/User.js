const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please add an email"],
  },
  password: {
    type: String,
    required: [true, "Please add password"],
    minLength: 8,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//encrypt passwors using dcrypt

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Sing In JWT and return

UserSchema.methods.getSingnedJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.isMatchPassword = async function (userEneteredPassword) {
  return await bcrypt.compare(userEneteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);

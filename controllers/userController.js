const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const generateToken = require("../utils/generateToken.js"); // import generateToken from "../utils/generateToken.js";
// @desc Register  new User
// @route  POST /api/v1/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(req.body);
  // console.log(req.body);

  // find user already exits
  const userExist = await User.findOne({
    email,
  });
  if (userExist) {
    res.status(400);
    throw new Error(`User already exist`);
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error(`Invalid user data`);
  }
});

// @desc login  a User
// @route  POST /api/v1/users/auth
// @access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // console.log(req.body);

  const user = await User.findOne({
    email,
  });

  // console.log(user);
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    // console.log("tokenUser", req.cookies.jwt);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error(`Invalid user data`);
  }
});
// @desc logout   a User
// @route  POST /api/v1/users/logout
// @access Public

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: new Date(0),
    sameSite: "Strict",
    // Prevent CSRF attacks
    secure: process.env.NODE_ENV !== "development",
  });
  return res.status(200).json({
    message: " user logout",
  });
});

// @desc get   a User
// @route  GET /api/v1/users/profile
// @access Private

const getProfile = asyncHandler(async (req, res) => {
  // console.log(req.user, "user");

  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
});

// @desc update   a User profile
// @route  PUT /api/v1/users/profile
// @access Private

const updateProfile = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = password || user.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(400);
    throw new Error(` user not found`);
  }
});
exports.userController = {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  updateProfile,
};

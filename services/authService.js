const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const ApiError = require("../utils/apiError");
const User = require("../models/userModel");

const createToken = (userId) =>
  jwt.sign({ userId: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

// @desc    Signup
// @route   GET /api/v1/auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res, next) => {
  // 1- Create user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // 2- Generate token
  const token = createToken(user._id);

  res.status(201).json({ data: user, token: token });
});

// @desc    login
// @route   GET /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }
  const token = createToken(user._id);
  res.status(200).json({ data: user, token: token });
});

// @desc    make sure the user is logged in
exports.protect = asyncHandler(async (req, res, next) => {
  // 1) Check if token exist, if exist get it
  console.log(req.headers);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
  }
  if (!token) {
    return next(
      new ApiError("You are not login to get access this route", 401)
    );
  }
  // 2) Verify token (no change happens, expired token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // 3) Check if user exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        "The user that belong to this token dose no longer exist",
        401
      )
    );
  }
  // 4) Check if user change his password after token created
  if (currentUser.passwordChangedAt) {
    const passwordChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    // if Password changed after token created (Error)
    if (passwordChangedTimestamp > decoded.iat) {
      return next(
        new ApiError(
          "User recently changed his password, please login again",
          401
        )
      );
    }
  }
  req.user = currentUser;
  next();
});

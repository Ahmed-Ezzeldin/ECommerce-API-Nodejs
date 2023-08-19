const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const factory = require("./handlersFactory");
const User = require("../models/userModel");
const ApiError = require("../utils/apiError");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

exports.uploadUserImage = uploadSingleImage("profileImg");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user_${uuidv4()}_${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/users/${filename}`);
    req.body.profileImg = filename;
  }
  next();
});

// @desc    Get list of users
// @route   GET /api/v1/users
// @access  Private
exports.getUsers = factory.getAll(User);

// @desc    Get specific user by id
// @route   GET /api/v1/users/:id
// @access  Privates
exports.getUser = factory.getOne(User);

// @desc    Create user
// @route   POST  /api/v1/users
// @access  Private
exports.createUser = factory.createOne(User);

// @desc    Update specific user
// @route   PUT /api/v1/users/:id
// @access  Privates
// exports.updateUser = factory.updateOne(User);
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      email: req.body.email,
      phone: req.body.phone,
      profileImg: req.body.profileImg,
      role: req.body.role,
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

// @desc    Delete specific user
// @route   DELETE /api/v1/users/:id
// @access  Privates
exports.deleteUser = factory.deleteOne(User);

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

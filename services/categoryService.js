const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const factory = require("./handlersFactory");
const Category = require("../models/categoryModel");
const ApiError = require("../utils/apiError");

// DiskStorage engine
const multerStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/categories");
  },
  filename: function (req, file, callback) {
    // category_${id}_Date.now().png
    const ext = file.mimetype.split("/")[1];
    const filename = `category_${uuidv4()}_${Date.now()}.${ext}`;
    callback(null, filename);
  },
});

const multerFilter = function (req, file, callback) {
  // image/png
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new ApiError("Only images allowed", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadCategoryImage = upload.single("image");

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public

// Build query
exports.getCategories = factory.getAll(Category);

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = factory.getOne(Category);

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createCategory = factory.createOne(Category);

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = factory.updateOne(Category);

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = factory.deleteOne(Category);

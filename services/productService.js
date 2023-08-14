const multer = require("multer");
const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const factory = require("./handlersFactory");
const Product = require("../models/productModel");
const ApiError = require("../utils/apiError");

const multerStorage = multer.memoryStorage();

const multerFilter = function (req, file, callback) {
  // image/png
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new ApiError("Only images allowed", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadProductImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  // Image processing for cover
  if (req.files.imageCover) {
    const imageCoverFileName = `product_${uuidv4()}_${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      //   .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/products/${imageCoverFileName}`);
    req.body.imageCover = imageCoverFileName;
  }
  // Image processing for images
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product_${uuidv4()}_${Date.now()}-${index + 1}.jpeg`;
        await sharp(img.buffer)
          //   .resize(600, 600)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`uploads/products/${imageName}`);
        req.body.images.push(imageName);
      })
    );
    next();
  }
});

// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = factory.getAll(Product, "Products");

// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = factory.getOne(Product);

// @desc    Create product
// @route   POST  /api/v1/products
// @access  Private
exports.createProduct = factory.createOne(Product);
// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = factory.updateOne(Product);

// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = factory.deleteOne(Product);

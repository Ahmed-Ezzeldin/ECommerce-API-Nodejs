const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Subcategory = require("../models/subcategoryModel");

// @desc Create Subcategory
// @route POST /api/v1/Subcategories
// @access Private
exports.createSubcategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await Subcategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

// @desc Get List of Subcategories
// @route GET /api/v1/subcategories
// @access Public
exports.getSubcategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  // const total = await CategoryModel.find({}).length;
  const subcategories = await Subcategory.find({}).skip(skip).limit(limit);
  res
    .status(200)
    .json({ results: subcategories.length, page, data: subcategories });
});

// @desc Get specific Subcategory
// @route POST /api/v1/subcategories/:id
// @access Public
exports.getSubcategory = asyncHandler(async (req, res, next) => {
  // const id = req.params.id
  const { id } = req.params;
  const subcategory = await Subcategory.findById(id);
  if (!subcategory) {
    return next(new ApiError(`No subcategory for this id ${id}`, 404));
  }
  res.status(200).json({ data: subcategory });
});

// @desc Update Subcategory
// @route PUT  /api/v1/subcategories
// private
exports.updateSubcategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subcategory = await Subcategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );

  if (!subcategory) {
    return next(new ApiError(`No subcategory for this id ${id}`, 404));
  }
  res.status(200).json({ data: subcategory });
});

// @desc Delete specified subcategory
// @route DELETE /api/subcategories/:id
// private
exports.deleteSubcategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await Subcategory.findByIdAndDelete(id);
  if (!subcategory) {
    return next(new ApiError(`No subcategory for this id ${id}`, 404));
  }
  res.status(204).send();
});

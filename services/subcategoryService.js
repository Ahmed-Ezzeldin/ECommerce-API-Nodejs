const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
// const ApiError = require("../utils/apiError")
const SubCategory = require("../models/subcategoryModel")


// @desc Create Subcategory
// @route POST /api/v1/Subcategories
// @access Private
exports.createSubcategory = asyncHandler(async (req, res) => {
    const { name, category } = req.body;
    const subCategory = await SubCategory.create({
        name,
        slug: slugify(name),
        category,
    });
    res.status(201).json({ data: subCategory });

});
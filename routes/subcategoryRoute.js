const express = require("express");

const {
  createSubcategory,
  getSubcategory,
  getSubcategories,
  updateSubcategory,
  deleteSubcategory,
} = require("../services/subcategoryService");

const {
  createSubcategoryValidator,
  getsubSubcategoryValidator,
  updateSubcategoryValidator,
  deleteSubcategoryValidator,
} = require("../utils/validators/subcategoryValidator");

const router = express.Router();

router
  .route("/")
  .post(createSubcategoryValidator, createSubcategory)
  .get(getSubcategories);
router
  .route("/:id")
  .get(getsubSubcategoryValidator, getSubcategory)
  .put(updateSubcategoryValidator, updateSubcategory)
  .delete(deleteSubcategoryValidator, deleteSubcategory);

module.exports = router;

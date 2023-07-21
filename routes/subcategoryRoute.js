const express = require("express");

const {
  createSubcategory,
  getSubcategory,
  getSubcategories,
} = require("../services/subcategoryService");

const {
  createSubcategoryValidator,
  getsubSubcategoryValidator,
} = require("../utils/validators/subcategoryValidator");

const router = express.Router();

router
  .route("/")
  .post(createSubcategoryValidator, createSubcategory)
  .get(getSubcategories);
router.route("/:id").get(getsubSubcategoryValidator, getSubcategory);

module.exports = router;

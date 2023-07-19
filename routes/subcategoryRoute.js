const express = require('express');

const {
    createSubcategory

} = require("../services/subcategoryService");

const {createSubcategoryValidator} = require("../utils/validators/subcategoryValidator");


const router = express.Router();

router.route("/").post(createSubcategoryValidator,createSubcategory);


module.exports = router;
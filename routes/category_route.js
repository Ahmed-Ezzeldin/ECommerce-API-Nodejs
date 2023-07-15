const express = require("express");
const { getCategories } = require("../services/category_service")

const router = express.Router()

router.get("/", getCategories);


module.exports = router;
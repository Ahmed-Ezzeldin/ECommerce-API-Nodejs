const express = require("express");
const { getCategories, createCategory } = require("../services/category_service")

const router = express.Router()

router.get("/", getCategories);
router.post("/", createCategory);


module.exports = router;
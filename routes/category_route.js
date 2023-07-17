const express = require("express");
const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../services/categoryService")

const router = express.Router()

router.route("/").get(getCategories).post(createCategory)
router.route("/:id").get(getCategory).put(updateCategory).delete(deleteCategory);
// router.get("/", getCategories);
// router.post("/", createCategory);


module.exports = router;
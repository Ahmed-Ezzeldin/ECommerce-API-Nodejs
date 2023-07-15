const mongoose = require("mongoose")

// ------------------------------------------- Schema
// 1- Create Schema
const CategorySchema = new mongoose.Schema({
    name: String,
})

// 2- Create model
const CategoryModel = mongoose.model("Category", CategorySchema);


module.exports = CategoryModel;
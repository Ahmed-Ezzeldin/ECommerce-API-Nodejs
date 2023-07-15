const CategoryModel = require("../models/category_model")

exports.getCategories = (req, res) => {
    const name = req.body.name;
    console.log(`Name: ${req.body}`);

    const newCategory = CategoryModel({ name });
    newCategory
        .save()
        .then((doc) => {
            res.json(doc);
        }).catch((err) => {
            res.json(err);
        });
}
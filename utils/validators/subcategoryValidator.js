const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getsubSubcategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subcategory id format"),
  validatorMiddleware,
];

exports.createSubcategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("subcategory is required")
    .isLength({ min: 2 })
    .withMessage("Too short subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long subcategory name"),
  check("category")
    .notEmpty()
    .withMessage("Subcategory must belong to category")
    .isMongoId()
    .withMessage("Invalid category id format"),
  validatorMiddleware,
];

// exports.updateSubcategoryValidator = [
//     check('id').isMongoId().withMessage("Invalid subcategory id format"),
//     check("name")
//         .notEmpty().withMessage("subcategory is required")
//         .isLength({ min: 3 }).withMessage("Too short subcategory name")
//         .isLength({ max: 32 }).withMessage("Too long subcategory name"),
//     validatorMiddleware,
// ];

// exports.deleteSubcategoryValidator = [
//     check('id').isMongoId().withMessage("Invalid subcategory id format"),
//     validatorMiddleware,
// ];

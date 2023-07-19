const mongoose = require("mongoose")

const subcategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: [true, 'Subcategory must be unique'],
            minlength: [2, 'Too short subcategory name'],
            maxlength: [32, 'Too long subcategory name'],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: "Category",
            required: [true, 'Subcategory must have parent category required'],
        }
    },
    { timestamps: true },
);

module.exports = mongoose.model("SubCategory", subcategorySchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ProductCategory Schema
const ProductCategorySchema = mongoose.Schema(
    {
        type: {
            type: String,
            default: 'Merch',
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        avatar: {
            type: String,
        },
        kind: {
            type: String,
            default: 'ProductCategory',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const ProductCategory =
    mongoose.models.ProductCategory ||
    mongoose.model('ProductCategory', ProductCategorySchema);
module.exports = ProductCategory;

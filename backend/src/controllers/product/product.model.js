const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Product Schema
const ProductSchema = mongoose.Schema(
    {
        status: {
            type: String,
            required: true,
        },
        payment_type: {
            type: String,
            enum: ['crypto', 'fiat', 'both'],
        },
        contract: {
            type: String,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'ProductCategory',
            required: true,
        },
        name: {
            type: String,
            unique: true,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        code: {
            type: String,
        },
        price: {
            type: {
                token: String,
                amount: Number,
            },
        },
        tags: {
            type: [String],
            default: [],
        },
        links: {
            type: [
                {
                    name: String,
                    url: String,
                    image: String,
                },
            ],
            default: [],
        },
        avatar: {
            type: String,
            default: '',
        },
        gallery: {
            type: [String],
            default: [],
        },
        kind: {
            type: String,
            default: 'Product',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const Product =
    mongoose.models.Product || mongoose.model('Product', ProductSchema);
module.exports = Product;

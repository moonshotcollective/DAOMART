const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ProductContract Schema
const ProductContractSchema = mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        chain: {
            type: String,
            required: true,
            trim: true,
        },
        productCount: {
            type: Number,
            default: 0,
        },

        kind: {
            type: String,
            default: 'ProductContract',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const ProductContract =
    mongoose.models.ProductContract ||
    mongoose.model('ProductContract', ProductContractSchema);
module.exports = ProductContract;

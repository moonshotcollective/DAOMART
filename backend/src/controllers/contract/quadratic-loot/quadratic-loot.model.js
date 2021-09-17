const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// QuadraticLoot Schema
const QuadraticLootSchema = mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
            trim: true,
        },
        chain: {
            type: String,
            required: true,
            trim: true,
        },
        kind: {
            type: String,
            default: 'QuadraticLoot',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const QuadraticLoot =
    mongoose.models.QuadraticLoot ||
    mongoose.model('QuadraticLoot', QuadraticLootSchema);
module.exports = QuadraticLoot;

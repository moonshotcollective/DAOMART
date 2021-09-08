const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// CandyContract Schema
const CandyContractSchema = mongoose.Schema(
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
            default: 'CandyContract',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const CandyContract =
    mongoose.models.CandyContract ||
    mongoose.model('CandyContract', CandyContractSchema);
module.exports = CandyContract;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Account Schema
const AccountSchema = mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        nonce: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        kind: {
            type: String,
            default: 'Account',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const Account = (module.exports = mongoose.model('Account', AccountSchema));

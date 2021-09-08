const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const UserSchema = mongoose.Schema(
    {
        status: {
            type: String,
            default: 'not-verified',
        },
        badge: {
            type: [String],
            default: ['pleb'],
        },
        account: {
            type: Schema.Types.ObjectId,
            ref: 'Account',
        },
        address: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,

            trim: true,
        },
        avatar: {
            type: String,

            trim: true,
        },

        kind: {
            type: String,
            default: 'User',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const User = (module.exports = mongoose.model('User', UserSchema));

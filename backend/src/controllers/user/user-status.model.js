const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// UserStatus Schema
const UserStatusSchema = mongoose.Schema(
    {
        status: {
            type: String,
            required: true,
        },
        prevStatus: {
            type: String,
            required: true,
        },
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        kind: {
            type: String,
            default: 'UserStatus',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const UserStatus = (module.exports = mongoose.model(
    'UserStatus',
    UserStatusSchema
));

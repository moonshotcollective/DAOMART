const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// UserBadge Schema
const UserBadgeSchema = mongoose.Schema(
    {
        badge: {
            type: String,
            required: true,
        },
        prevBadge: {
            type: String,
            required: true,
        },
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        kind: {
            type: String,
            default: 'UserBadge',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const UserBadge = (module.exports = mongoose.model(
    'UserBadge',
    UserBadgeSchema
));

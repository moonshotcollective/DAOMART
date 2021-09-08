const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Order Schema
const OrderSchema = mongoose.Schema(
    {
        status: {
            type: String,
            required: true,
        },
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            index: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        type: {
            type: String,
            default: 'Full',
        },
        timestamp: {
            type: String,
            default: Date.now(),
        },
        kind: {
            type: String,
            default: 'Order',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
module.exports = Order;

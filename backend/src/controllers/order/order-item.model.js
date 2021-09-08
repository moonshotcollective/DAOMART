const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// OrderItem Schema
const OrderItemSchema = mongoose.Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
            trim: true,
            ,
        },
        amount: {
            type: Number,
            default: 1,
        },

        kind: {
            type: String,
            default: 'OrderItem',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const OrderItem = (module.exports = mongoose.model(
    'OrderItem',
    OrderItemSchema
));

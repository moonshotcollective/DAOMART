const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Status Schema
const StatusSchema = mongoose.Schema(
    {
        status: {
            type: String,
            required: true,
        },
        prevStatus: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        kind: {
            type: String,
            default: 'Status',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const Status = (module.exports = mongoose.model('Status', StatusSchema));

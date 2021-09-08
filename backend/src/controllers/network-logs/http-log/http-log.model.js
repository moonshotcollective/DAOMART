const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// HttpLog Schema
const HttpLogSchema = mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            index: true,
        },
        method: {
            type: String,
            required: true,
            index: true,
        },
        route: {
            type: String,
            required: true,
            index: true,
        },
        ip: {
            type: String,
            required: true,
        },
        geolocation: {
            type: String,
        },
        data: {
            type: String,
        },
        user: {
            type: String,
            index: true,
        },
        kind: {
            type: String,
            default: 'HttpLog',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const HttpLog = (module.exports = mongoose.model('HttpLog', HttpLogSchema));

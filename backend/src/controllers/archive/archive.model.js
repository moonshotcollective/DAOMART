const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Archive Schema
const ArchiveSchema = mongoose.Schema(
    {
        products: {
            type: [{type: Schema.Types.ObjectId, ref: 'Product'}],
            required: [],
        },
        name: {
            type: String,
            unique: true,
            required: true,
            ,
        },
        description: {
            type: String,
            required: true,
            ,
        },
        code: {
            type: String,
            unique: true,
            required: true,
            ,
        },
        tags: {
            type: [String],
            default: [],
        },
        links: {
            type: [
                {
                    name: String,
                    url: String,
                    image: String,
                },
            ],
            default: [],
        },
        avatar: {
            type: Schema.Types.ObjectId,
            ref: 'Photo',
            required: true,
        },
        gallery: {
            type: {
                type: Schema.Types.ObjectId,
                ref: 'Photo',
            },
            default: [],
        },
        kind: {
            type: String,
            default: 'Archive',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const Archive = (module.exports = mongoose.model('Archive', ArchiveSchema));

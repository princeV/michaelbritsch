'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Picture Schema
 */
var PictureSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Picture name',
        trim: true
    },
    description: {
        type: String,
        default: '',
        required: 'Please fill Picture description',
        trim: true
    },
    linkToHost: {
        type: String,
        default: '',
        required: 'Please fill link to host',
        trim: true
    },
    sizes: [{
        label: {
            type: String,
            default: '',
            trim: true
        },
        source: {
            type: String,
            default: '',
            trim: true
        },
        width: {
            type: Number,
            default: 0
        },
        height: {
            type: Number,
            default: 0
        }
    }],
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Picture', PictureSchema);

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Category Schema
 */
var CategorySchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Category name',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    type: String,
    parent_id: { type: Schema.ObjectId, ref: 'parent_id' },
    image: String
});

mongoose.model('Category', CategorySchema);
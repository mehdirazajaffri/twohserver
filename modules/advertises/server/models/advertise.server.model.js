'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Advertise Schema
 */
var AdvertiseSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Advertise name',
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    image: String,
    description: String,
    offers: String,
    updated_at: Date
});

mongoose.model('Advertise', AdvertiseSchema);
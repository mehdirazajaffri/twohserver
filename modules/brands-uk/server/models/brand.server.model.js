'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Brand Schema
 */
var BrandSchema2 = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Brand name',
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    description: String,
    order_number:{
    type:Number
    },
    url: String,
    image: String,
    minimum:{type:Number,default:0},
    charges:{type:Number,default:0}
});

mongoose.model('Brand-uk', BrandSchema2);
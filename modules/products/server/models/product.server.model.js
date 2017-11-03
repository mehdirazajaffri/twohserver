'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Product name',
    trim: true
  },
  image:{
    type: String,
    
  },
  order_number:{
    type:Number
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Product', ProductSchema);

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Rate Schema
 */
var RateSchema = new Schema({
  quantity:String,
  charges:String,
  minimum:String,
  created: {
    type: Date,
    default: Date.now
  },
  type:{type:String,enum:['shipping','delivery']},
  product_id:{
    type: Schema.ObjectId,
    ref: 'Product'  
  }
});

mongoose.model('Rate', RateSchema);

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Delivery charge Schema
 */
var DeliveryChargeSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  brands: {
    type: Schema.ObjectId,
    ref: 'Brand'
  },
  charges:{
    type:[{quantity:String,charges:String,minimum:String}],validate: [arrayLimit, '{PATH} exceeds the limit of 11']}
});

function arrayLimit(val) {
  return val.length <= 11;
}

mongoose.model('DeliveryCharge', DeliveryChargeSchema);

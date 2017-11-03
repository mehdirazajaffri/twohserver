'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Shipping charge Schema
 */
var ShippingChargeSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  brands: {
    type: Schema.ObjectId,
    ref: 'Brand'
  },
  products:{
    type: Schema.ObjectId,
    ref: 'Product'
  },
  type:{
    type:String
  }
});
function arrayLimit(val) {
  return val.length <= 11;
}
mongoose.model('ShippingCharge', ShippingChargeSchema);

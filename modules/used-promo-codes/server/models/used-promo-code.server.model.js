'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Used promo code Schema
 */
var UsedPromoCodeSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  code:String,
  is_used:{
    type:Boolean,
    default:false
  },
  promo:{
    type: Schema.ObjectId,
    ref: 'Promo'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('UsedPromoCode', UsedPromoCodeSchema);

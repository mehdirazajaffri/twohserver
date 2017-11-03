'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Promotion bar Schema
 */
var PromotionBarSchema = new Schema({
  text: {
    type: String,
    default: '',
    required: 'Please fill Promotion bar text',
    trim: true
  },
  url:{
    type: String,
    default: '',
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('PromotionBar', PromotionBarSchema);

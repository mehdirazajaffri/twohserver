'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Order number Schema
 */
var OrderNumberSchema = new Schema({
  last_number: {
    type: Number,
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated_at:{
    type: Date
  }
});

mongoose.model('OrderNumber', OrderNumberSchema);

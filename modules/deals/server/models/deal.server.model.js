'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Deal Schema
 */
var DealSchema = new Schema({
  title: {
    type: String,
    default: '',
    required: 'Please fill Deal name',
    trim: true
  },
  image_url:{
    type:String
  },
  link:{
    type:String
  },
  description:{
    type:String
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated_at:{
    type:Date
  }
});

mongoose.model('Deal', DealSchema);

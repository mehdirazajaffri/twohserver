'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Review Schema
 */
var ReviewSchema = new Schema({
  review: {
    type: String,
    default: '',
    required: 'Please fill Review',
    trim: true
  },
  profile_pic:String,
  link:String,
  name:String,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  created_at:{
    type:Date,
    default:Date.now
  }
});

mongoose.model('Review', ReviewSchema);

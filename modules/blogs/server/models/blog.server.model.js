'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Blog Schema
 */
var BlogSchema = new Schema({
  summary: {
    type: String,
    default: '',
    required: 'Please fill Blog summary',
    trim: true
  },
  title:String,
  link :{
    type:String
  },
  blog_url:{
    type:String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Blog', BlogSchema);

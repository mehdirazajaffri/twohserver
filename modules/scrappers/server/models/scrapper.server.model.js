'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Scrapper Schema
 */
var ScrapperSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Scrapper name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Scrapper', ScrapperSchema);

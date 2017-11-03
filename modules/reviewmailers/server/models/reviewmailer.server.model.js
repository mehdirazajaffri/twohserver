'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Reviewmailer Schema
 */
var ReviewmailerSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Reviewmailer name',
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

mongoose.model('Reviewmailer', ReviewmailerSchema);

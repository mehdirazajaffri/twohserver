'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Subscribe user Schema
 */
var SubscribeUserSchema = new Schema({
  email:{
    type: String,
    default: '',
    required: 'Please fill Subscribe email',
    trim: true,
    unique:true  
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('SubscribeUser', SubscribeUserSchema);

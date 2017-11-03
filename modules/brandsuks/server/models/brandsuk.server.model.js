'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Brandsuk Schema
 */
var BrandsukSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Brandsuk name',
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
	description: String,
	order_number:{
	type:Number
	},
	url: String,
	image: String,
	minimum:{type:Number,default:0},
	charges:{type:Number,default:0}
});

mongoose.model('Brandsuk', BrandsukSchema);

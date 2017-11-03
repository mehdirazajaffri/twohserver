'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Brand category Schema
 */
var BrandCategorySchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Brand category name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  description:{
    type: String
  },
  image:{
    type: String,
  },
  brand_id:{
    type: Schema.ObjectId,
    ref: 'Brand'
  }
});

mongoose.model('BrandCategory', BrandCategorySchema);

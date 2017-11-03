'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Setting Schema
 */
var SettingSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  us_doller:{
    type:Number,
    default:109
  },
  deposit_percentage :{
    type:Number,
    default:0.25
  },
  service_charges_percentage:{
    type:Number,
    default:0.05
  },
  special_offer_tax_percentage:{
    type:Number,
    default:0.12
  },
  tax_percentage:{
    type:Number,
    default:0.19
  }
});

mongoose.model('Setting', SettingSchema);

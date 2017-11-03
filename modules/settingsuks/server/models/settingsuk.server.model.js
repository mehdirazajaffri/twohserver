'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Settingsuk Schema
 */
var SettingsukSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  pound :{
    type:Number,
    default:109
  },
  deposituk_percentage :{
    type:Number,
    default:0.25
  },
  service_chargesuk_percentage:{
    type:Number,
    default:0.05
  },
  special_offer_taxuk_percentage:{
    type:Number,
    default:0.12
  },
  taxuk_percentage:{
    type:Number,
    default:0.19
  }
});

mongoose.model('Uksetting', SettingsukSchema);

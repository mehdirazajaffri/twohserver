'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Promo Schema
 */
var PromoSchema = new Schema({
  title: {
    type: String,
    required: 'Please fill Promo Title'
  },
  code:{
    type:String,
    unique: 'Promo Code already exists',
    required:"Please fill Promo Code"
  },
  start_date:{
       type: Date
  },
  end_date:{
       type: Date
  },
  is_enabled:{
    type:Boolean,
    default:true
  },
  value:String,
  type:{
    type:String,
    enum:['free_delivery','shipping_percentage','free_shopping','deposit_voucher']
  },
  is_deleted:{
    type:Boolean,
    default:false
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated_at:{
   type: Date
  }
});

PromoSchema.path('code').validate(function (v) {
    return v.length <= 10;
}, 'The maximum length is 10.');


mongoose.model('Promo', PromoSchema);

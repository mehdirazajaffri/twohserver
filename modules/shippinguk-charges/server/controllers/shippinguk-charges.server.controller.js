'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Rate  = mongoose.model('Ukrate'),
  ShippingCharge = mongoose.model('ShippingukCharge'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Shipping charge
 */
exports.create = function(req, res) {
  var shippingCharge = new ShippingCharge(req.body);
  shippingCharge.user = req.user;

  shippingCharge.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(shippingCharge);
    }
  });
};

/**
 * Show the current Shipping charge
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var shippingCharge = req.shippingCharge ? req.shippingCharge.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  shippingCharge.isCurrentUserOwner = req.user && shippingCharge.user && shippingCharge.user._id.toString() === req.user._id.toString();

  res.jsonp(shippingCharge);
};

/**
 * Update a Shipping charge
 */
exports.update = function(req, res) {
  var shippingCharge = req.shippingCharge;

  shippingCharge = _.extend(shippingCharge, req.body);

  shippingCharge.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(shippingCharge);
    }
  });
};

/**
 * Delete an Shipping charge
 */
exports.delete = function(req, res) {
  var shippingCharge = req.shippingCharge;

  shippingCharge.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(shippingCharge);
    }
  });
};

/**
 * List of Shipping charges
 */
exports.list = function(req, res) {
 // console.log(req.headers.authorization);
  var sort = {type:'shipping'};
  if(req.query.type){
    if(req.query.type == 1){
      sort = {type:'shipping'}
    }else{
      sort = {type:'delivery'}
    }
  }
  ShippingCharge.find(sort).sort('-created').populate('brands').populate('products').exec(function(err, shippingChargesList) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      getAllCharges(0,shippingChargesList,function(arr){
         res.jsonp(arr);
      });
    }
  });
};

/**
 * Shipping charge middleware
 */
exports.shippingChargeByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Shipping charge is invalid'
    });
  }

  ShippingCharge.findById(id).populate('brands').populate('products').exec(function (err, shippingCharge) {
    if (err) {
      return next(err);
    } else if (!shippingCharge) {
      return res.status(404).send({
        message: 'No Shipping charge with that identifier has been found'
      });
    }
    req.shippingCharge = shippingCharge;
    next();
  });
};

exports.checkShipping =  function(){
  ShippingCharge.findOne({}, function(err,shipping){
 // console.log(err,shipping);
})
}


exports.updateByID = function(req, res) {
  if(!req.params.id && req.params.sub_id){
    return res.status(400).send({
        message: "Please Send Unique ID"
      });
  }
  else{
   // console.log(req.params,id,req.body);
  var id = req.params.id;
  var subId = req.params.sub_id;
  var shipping = req.body;
  var updateCondtion = {$set:{}};
  for (var k in shipping){
      if(k != '_id' && k == '__v'){
        updateCondtion["$set"]["charges.$."+k] = shipping[k];
      }
  }
  ShippingCharge.findOneAndUpdate(
    { "_id": id, "charges._id": subId },
    updateCondtion,
    function(err, doc) {
      //  console.error("Error:", err);
       // console.log("Doc:", doc);
         if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(doc);
    }
    }
);
  }
};


function getAllCharges(index,arr,cb){
  if(index ==arr.length){
    cb(arr);
  }else{
    arr[index] = JSON.stringify(arr[index]);
    arr[index] = JSON.parse(arr[index]);
    Rate.find({shippings:arr[index]['_id']}).exec(function(err,charges){
      if(err){
         arr[index]['charges']= [];
         index = index+1;
         getAllCharges(index,arr,cb);
      }else{
        arr[index]['charges'] = charges;
        index = index+1;
        getAllCharges(index,arr,cb);
      }
    })
  }
}
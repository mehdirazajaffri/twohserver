'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Rate = mongoose.model('Ukrate'),
  Product = mongoose.model('Product'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Rate
 */
exports.create = function(req, res) {
  var rate = new Rate(req.body);
  rate.user = req.user;

  rate.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rate);
    }
  });
};

/**
 * Show the current Rate
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var rate = req.rate ? req.rate.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  rate.isCurrentUserOwner = req.user && rate.user && rate.user._id.toString() === req.user._id.toString();

  res.jsonp(rate);
};

/**
 * Update a Rate
 */
exports.update = function(req, res) {
  var rate = req.rate;

  rate = _.extend(rate, req.body);

  rate.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rate);
    }
  });
};

/**
 * Delete an Rate
 */
exports.delete = function(req, res) {
  var rate = req.rate;

  rate.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rate);
    }
  });
};

/**
 * List of Rates
 */
exports.list = function(req, res) {
  var sort = {type:'shipping'};
  if(req.query.type){
    if(req.query.type == 1){
      sort = {type:'shipping'}
    }else{
      sort = {type:'delivery'}
    }
  }
  Product.find({},function(err,ProductList){
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }else{
      getAllCharges(0,ProductList,sort,function(data){
           res.jsonp(data);
      })
    }
  })
  // Rate.find(sort).sort('-created').populate('product_id').exec(function(err, rates) {
  //   if (err) {
  //     return res.status(400).send({
  //       message: errorHandler.getErrorMessage(err)
  //     });
  //   } else {
  //     res.jsonp(rates);
  //   }
  // });
};

/**
 * Rate middleware
 */
exports.ratesukByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Rate is invalid'
    });
  }

  Rate.findById(id).populate('product_id').exec(function (err, rate) {
    if (err) {
      return next(err);
    } else if (!rate) {
      return res.status(404).send({
        message: 'No Rate with that identifier has been found'
      });
    }
    req.rate = rate;
    next();
  });
};


exports.updateRates = function(req, res) {
  var rate = req.body;
  if(req.body.charges.length >0){
    updateAllRates(0,req.body.charges,function(data){
      return res.send({code:200,message:"Records Updated",data:data,success:true});
    });
  }else{
     return res.status(400).send({
      message: 'Please Send Rates for update'
    });
  }
};

function updateAllRates (index,arr,cb){
  if(index ==arr.length){
    cb(arr);
  }else{
    var id = arr[index]['_id'];
    delete  arr[index]['_id'];
    Rate.findByIdAndUpdate(id,arr[index], function(err,updateVal){
      if(err){
        index = index +1;
        updateAllRates (index,arr,cb);
      }else{
        updateVal = JSON.stringify(updateVal);
        updateVal = JSON.parse(updateVal);
        arr[index] = updateVal;
        index =  index+1;
        updateAllRates (index,arr,cb)
      }
    });
  }
}



function getAllCharges(index,arr,option,cb){
  if(index ==arr.length){
    cb(arr);
  }else{
    arr[index] = JSON.stringify(arr[index]);
    arr[index] = JSON.parse(arr[index]);
    var query  = {product_id:arr[index]['_id']};
    query['type'] = option.type;

    Rate.find(query).exec(function(err,charges){
      if(err){
         arr[index]['charges']= [];
         index = index+1;
         getAllCharges(index,arr,option,cb);
      }else{
        arr[index]['charges'] = charges;
        index = index+1;
        getAllCharges(index,arr,option,cb);
      }
    })
  }
}
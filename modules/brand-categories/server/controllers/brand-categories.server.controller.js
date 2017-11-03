'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  BrandCategory = mongoose.model('BrandCategory'),
  Brands = mongoose.model('Brand'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Brand category
 */
exports.createCategory = function(req, res) {
  var brandCategory = new BrandCategory(req.body);
  brandCategory.user = req.user;

  brandCategory.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(brandCategory);
    }
  });
};

/**
 * Show the current Brand category
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var brandCategory = req.brandCategory ? req.brandCategory.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  brandCategory.isCurrentUserOwner = req.user && brandCategory.user && brandCategory.user._id.toString() === req.user._id.toString();

  res.jsonp(brandCategory);
};

/**
 * Update a Brand category
 */
exports.update = function(req, res) {
  var brandCategory = req.brandCategory;

  brandCategory = _.extend(brandCategory, req.body);

  brandCategory.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(brandCategory);
    }
  });
};

/**
 * Delete an Brand category
 */
exports.delete = function(req, res) {
  var brandCategory = req.brandCategory;

  brandCategory.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(brandCategory);
    }
  });
};

/**
 * List of Brand categories
 */
exports.list = function(req, res) {
  BrandCategory.find().sort('-created').populate('user', 'displayName').exec(function(err, brandCategories) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(brandCategories);
    }
  });
};

/**
 * Brand category middleware
 */
exports.brandCategoryByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Brand category is invalid'
    });
  }

  BrandCategory.findById(id).populate('user', 'displayName').exec(function (err, brandCategory) {
    if (err) {
      return next(err);
    } else if (!brandCategory) {
      return res.status(404).send({
        message: 'No Brand category with that identifier has been found'
      });
    }
    req.brandCategory = brandCategory;
    next();
  });
};


exports.create =  function(req,res){
  console.log("check category Error");
    Brands.find({}, function(err,listBrands){
      if(err){
           console.log(err);
           return next(err);
      }else if (listBrands.length == 0){
        return res.status(404).send({
          code:400,message:"Please Add Brands Before Insert categories",success:false
        });
      }else{
        var brandList = [];
        for (var i =0; i<listBrands.length;i++){
          var data = req.body;
          data['brand_id'] = listBrands[i]['_id'];
          brandList.push(data);
        }
        insertCategory(0,brandList, function(arr){
          return res.send({code:200, message:"Inserted",data:arr,success:true});
        })
      }
    });
};
function insertCategory(index,arr,cb){
  if(index == arr.length){
    return cb(arr);
  }else{
      var brandCategory = new BrandCategory(arr[index]);
      brandCategory.save(function(err,cate) {
        if (err) {
          index = index+1;
          insertCategory(index,arr,cb);
        } else {
          arr[index] = cate;
          index = index+1;
          insertCategory(index,arr,cb);
        }
      });
  }
}
'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  DeliveryCharge = mongoose.model('DeliveryCharge'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Delivery charge
 */
exports.create = function(req, res) {
  var deliveryCharge = new DeliveryCharge(req.body);
  deliveryCharge.user = req.user;

  deliveryCharge.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(deliveryCharge);
    }
  });
};

/**
 * Show the current Delivery charge
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var deliveryCharge = req.deliveryCharge ? req.deliveryCharge.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  deliveryCharge.isCurrentUserOwner = req.user && deliveryCharge.user && deliveryCharge.user._id.toString() === req.user._id.toString();

  res.jsonp(deliveryCharge);
};

/**
 * Update a Delivery charge
 */
exports.update = function(req, res) {
  var deliveryCharge = req.deliveryCharge;

  deliveryCharge = _.extend(deliveryCharge, req.body);

  deliveryCharge.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(deliveryCharge);
    }
  });
};

/**
 * Delete an Delivery charge
 */
exports.delete = function(req, res) {
  var deliveryCharge = req.deliveryCharge;

  deliveryCharge.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(deliveryCharge);
    }
  });
};

/**
 * List of Delivery charges
 */
exports.list = function(req, res) {
  DeliveryCharge.find().sort('-created').populate('brands').exec(function(err, deliveryCharges) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(deliveryCharges);
    }
  });
};

/**
 * Delivery charge middleware
 */
exports.deliveryChargeByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Delivery charge is invalid'
    });
  }

  DeliveryCharge.findById(id).populate('brands').exec(function (err, deliveryCharge) {
    if (err) {
      return next(err);
    } else if (!deliveryCharge) {
      return res.status(404).send({
        message: 'No Delivery charge with that identifier has been found'
      });
    }
    req.deliveryCharge = deliveryCharge;
    next();
  });
};

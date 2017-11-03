'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  OrderNumber = mongoose.model('OrderNumber'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Order number
 */
exports.create = function(req, res) {
  var orderNumber = new OrderNumber(req.body);
  orderNumber.user = req.user;

  orderNumber.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(orderNumber);
    }
  });
};

/**
 * Show the current Order number
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var orderNumber = req.orderNumber ? req.orderNumber.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  orderNumber.isCurrentUserOwner = req.user && orderNumber.user && orderNumber.user._id.toString() === req.user._id.toString();

  res.jsonp(orderNumber);
};

/**
 * Update a Order number
 */
exports.update = function(req, res) {
  var orderNumber = req.orderNumber;

  orderNumber = _.extend(orderNumber, req.body);

  orderNumber.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(orderNumber);
    }
  });
};

/**
 * Delete an Order number
 */
exports.delete = function(req, res) {
  var orderNumber = req.orderNumber;

  orderNumber.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(orderNumber);
    }
  });
};

/**
 * List of Order numbers
 */
exports.list = function(req, res) {
  OrderNumber.find().sort('-created').populate('user').exec(function(err, orderNumbers) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(orderNumbers);
    }
  });
};

/**
 * Order number middleware
 */
exports.orderNumberByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Order number is invalid'
    });
  }

  OrderNumber.findById(id).populate('user').exec(function (err, orderNumber) {
    if (err) {
      return next(err);
    } else if (!orderNumber) {
      return res.status(404).send({
        message: 'No Order number with that identifier has been found'
      });
    }
    req.orderNumber = orderNumber;
    next();
  });
};

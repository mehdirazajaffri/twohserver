'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Deal = mongoose.model('Deal'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Deal
 */
exports.create = function(req, res) {
  var deal = new Deal(req.body);
  deal.user = req.user;

  deal.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(deal);
    }
  });
};

/**
 * Show the current Deal
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var deal = req.deal ? req.deal.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  deal.isCurrentUserOwner = req.user && deal.user && deal.user._id.toString() === req.user._id.toString();

  res.jsonp(deal);
};

/**
 * Update a Deal
 */
exports.update = function(req, res) {
  var deal = req.deal;

  deal = _.extend(deal, req.body);

  deal.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(deal);
    }
  });
};

/**
 * Delete an Deal
 */
exports.delete = function(req, res) {
  var deal = req.deal;

  deal.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(deal);
    }
  });
};

/**
 * List of Deals
 */
exports.list = function(req, res) {
  Deal.find().sort('-created').populate('user', 'displayName').exec(function(err, deals) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(deals);
    }
  });
};

/**
 * Deal middleware
 */
exports.dealByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Deal is invalid'
    });
  }

  Deal.findById(id).populate('user', 'displayName').exec(function (err, deal) {
    if (err) {
      return next(err);
    } else if (!deal) {
      return res.status(404).send({
        message: 'No Deal with that identifier has been found'
      });
    }
    req.deal = deal;
    next();
  });
};

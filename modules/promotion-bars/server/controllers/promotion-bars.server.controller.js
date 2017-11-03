'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  PromotionBar = mongoose.model('PromotionBar'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Promotion bar
 */
exports.create = function(req, res) {
  var promotionBar = new PromotionBar(req.body);
  promotionBar.user = req.user;

  promotionBar.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(promotionBar);
    }
  });
};

/**
 * Show the current Promotion bar
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var promotionBar = req.promotionBar ? req.promotionBar.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  promotionBar.isCurrentUserOwner = req.user && promotionBar.user && promotionBar.user._id.toString() === req.user._id.toString();

  res.jsonp(promotionBar);
};

/**
 * Update a Promotion bar
 */
exports.update = function(req, res) {
  var promotionBar = req.promotionBar;

  promotionBar = _.extend(promotionBar, req.body);

  promotionBar.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(promotionBar);
    }
  });
};

/**
 * Delete an Promotion bar
 */
exports.delete = function(req, res) {
  var promotionBar = req.promotionBar;

  promotionBar.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(promotionBar);
    }
  });
};

/**
 * List of Promotion bars
 */
exports.list = function(req, res) {
  PromotionBar.find().sort('-created').populate('user', 'displayName').exec(function(err, promotionBars) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(promotionBars);
    }
  });
};

/**
 * Promotion bar middleware
 */
exports.promotionBarByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Promotion bar is invalid'
    });
  }

  PromotionBar.findById(id).populate('user', 'displayName').exec(function (err, promotionBar) {
    if (err) {
      return next(err);
    } else if (!promotionBar) {
      return res.status(404).send({
        message: 'No Promotion bar with that identifier has been found'
      });
    }
    req.promotionBar = promotionBar;
    next();
  });
};

'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Advertise = mongoose.model('Advertise'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Advertise
 */
exports.create = function(req, res) {
  var advertise = new Advertise(req.body);
  advertise.user = req.user;

  advertise.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(advertise);
    }
  });
};

/**
 * Show the current Advertise
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var advertise = req.advertise ? req.advertise.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  advertise.isCurrentUserOwner = req.user && advertise.user && advertise.user._id.toString() === req.user._id.toString();

  res.jsonp(advertise);
};

/**
 * Update a Advertise
 */
exports.update = function(req, res) {
  var advertise = req.advertise;

  advertise = _.extend(advertise, req.body);

  advertise.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(advertise);
    }
  });
};

/**
 * Delete an Advertise
 */
exports.delete = function(req, res) {
  var advertise = req.advertise;

  advertise.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(advertise);
    }
  });
};

/**
 * List of Advertises
 */
exports.list = function(req, res) {
  Advertise.find().sort('-created').populate('user', 'displayName').exec(function(err, advertises) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(advertises);
    }
  });
};

/**
 * Advertise middleware
 */
exports.advertiseByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Advertise is invalid'
    });
  }

  Advertise.findById(id).populate('user', 'displayName').exec(function (err, advertise) {
    if (err) {
      return next(err);
    } else if (!advertise) {
      return res.status(404).send({
        message: 'No Advertise with that identifier has been found'
      });
    }
    req.advertise = advertise;
    next();
  });
};

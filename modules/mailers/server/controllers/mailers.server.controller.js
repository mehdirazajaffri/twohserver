'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Mailer = mongoose.model('Mailer'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Mailer
 */
exports.create = function(req, res) {
  var mailer = new Mailer(req.body);
  mailer.user = req.user;

  mailer.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mailer);
    }
  });
};

/**
 * Show the current Mailer
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var mailer = req.mailer ? req.mailer.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  mailer.isCurrentUserOwner = req.user && mailer.user && mailer.user._id.toString() === req.user._id.toString();

  res.jsonp(mailer);
};

/**
 * Update a Mailer
 */
exports.update = function(req, res) {
  var mailer = req.mailer;

  mailer = _.extend(mailer, req.body);

  mailer.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mailer);
    }
  });
};

/**
 * Delete an Mailer
 */
exports.delete = function(req, res) {
  var mailer = req.mailer;

  mailer.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mailer);
    }
  });
};

/**
 * List of Mailers
 */
exports.list = function(req, res) {
  Mailer.find().sort('-created').populate('user', 'displayName').exec(function(err, mailers) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mailers);
    }
  });
};

/**
 * Mailer middleware
 */
exports.mailerByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Mailer is invalid'
    });
  }

  Mailer.findById(id).populate('user', 'displayName').exec(function (err, mailer) {
    if (err) {
      return next(err);
    } else if (!mailer) {
      return res.status(404).send({
        message: 'No Mailer with that identifier has been found'
      });
    }
    req.mailer = mailer;
    next();
  });
};

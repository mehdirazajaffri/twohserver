'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  SubscribeUser = mongoose.model('SubscribeUser'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Subscribe user
 */
exports.create = function(req, res) {
  var subscribeUser = new SubscribeUser(req.body);
  subscribeUser.user = req.user;

  subscribeUser.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(subscribeUser);
    }
  });
};

/**
 * Show the current Subscribe user
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var subscribeUser = req.subscribeUser ? req.subscribeUser.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  subscribeUser.isCurrentUserOwner = req.user && subscribeUser.user && subscribeUser.user._id.toString() === req.user._id.toString();

  res.jsonp(subscribeUser);
};

/**
 * Update a Subscribe user
 */
exports.update = function(req, res) {
  var subscribeUser = req.subscribeUser;

  subscribeUser = _.extend(subscribeUser, req.body);

  subscribeUser.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(subscribeUser);
    }
  });
};

/**
 * Delete an Subscribe user
 */
exports.delete = function(req, res) {
  var subscribeUser = req.subscribeUser;

  subscribeUser.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(subscribeUser);
    }
  });
};

/**
 * List of Subscribe users
 */
exports.list = function(req, res) {
  SubscribeUser.find().sort('-created').populate('user', 'displayName').exec(function(err, subscribeUsers) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(subscribeUsers);
    }
  });
};

/**
 * Subscribe user middleware
 */
exports.subscribeUserByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Subscribe user is invalid'
    });
  }

  SubscribeUser.findById(id).populate('user', 'displayName').exec(function (err, subscribeUser) {
    if (err) {
      return next(err);
    } else if (!subscribeUser) {
      return res.status(404).send({
        message: 'No Subscribe user with that identifier has been found'
      });
    }
    req.subscribeUser = subscribeUser;
    next();
  });
};

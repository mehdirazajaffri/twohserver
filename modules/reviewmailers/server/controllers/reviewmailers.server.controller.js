'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Reviewmailer = mongoose.model('Reviewmailer'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  nodemailer = require('nodemailer');
   var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'zuhairhussain574@gmail.com',
           pass: 'bunty125'
       }
   });
/**
 * Create a Reviewmailer
 */
exports.create = function(req, res) {
  var reviewmailer = new Reviewmailer(req.body);
  reviewmailer.user = req.user;
  console.log(req.body)
  const mailOptions = {
    from: 'zuhairhussain574@gmail.com', // sender address
    to: req.body.email, // list of receivers
    subject: req.body.status, // Subject line
    html: '<h1>Your order is '+  req.body.status.replace("order_", "") +'</h1>'// plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else{}
      res.jsonp(info);
 });
};

/**
 * Show the current Reviewmailer
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var reviewmailer = req.reviewmailer ? req.reviewmailer.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  reviewmailer.isCurrentUserOwner = req.user && reviewmailer.user && reviewmailer.user._id.toString() === req.user._id.toString();

  res.jsonp(reviewmailer);
};

/**
 * Update a Reviewmailer
 */
exports.update = function(req, res) {
  var reviewmailer = req.reviewmailer;

  reviewmailer = _.extend(reviewmailer, req.body);

  reviewmailer.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(reviewmailer);
    }
  });
};

/**
 * Delete an Reviewmailer
 */
exports.delete = function(req, res) {
  var reviewmailer = req.reviewmailer;

  reviewmailer.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(reviewmailer);
    }
  });
};

/**
 * List of Reviewmailers
 */
exports.list = function(req, res) {
  Reviewmailer.find().sort('-created').populate('user', 'displayName').exec(function(err, reviewmailers) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(reviewmailers);
    }
  });
};

/**
 * Reviewmailer middleware
 */
exports.reviewmailerByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Reviewmailer is invalid'
    });
  }

  Reviewmailer.findById(id).populate('user', 'displayName').exec(function (err, reviewmailer) {
    if (err) {
      return next(err);
    } else if (!reviewmailer) {
      return res.status(404).send({
        message: 'No Reviewmailer with that identifier has been found'
      });
    }
    req.reviewmailer = reviewmailer;
    next();
  });
};

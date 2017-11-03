'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Promo = mongoose.model('Promo'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  UsedPromoCode = mongoose.model('UsedPromoCode'),
  _ = require('lodash');

/**
 * Create a Promo
 */
exports.create = function (req, res) {
  var requirement = {
    code: null,
    title: null,
    start_date: null,
    end_date: null,
    type: null
  };
  var data = req.body;

  for (var k in requirement) {
    if (data[k] == '' || data[k] == null || !data[k]) {
      return res.status(400).send({
        code: 400,
        message: "Please Fill " + k,
        success: false
      })
    }

    if (k == 'start_date' || k == 'end_date') {
      if (!isValidDate(data[k])) {
        return res.status(400).send({
          code: 400,
          message: k + " is invalid",
          success: false
        });
      }
    }
  }

  if (compareTwoDates(new Date(), data['start_date'])) {
    return res.status(400).send({
      code: 400,
      message: "start_date is less then current date",
      success: false
    });
  }

  if (compareTwoDates(data['start_date'], data['end_date'])) {
    return res.status(400).send({
      code: 400,
      message: "end_date is less then start date",
      success: false
    });
  }
  data.is_enabled = true;
  var promo = new Promo(data);
  promo.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(promo);
    }
  });
};

/**
 * Show the current Promo
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var promo = req.promo ? req.promo.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  promo.isCurrentUserOwner = req.user && promo.user && promo.user._id.toString() === req.user._id.toString();

  res.jsonp(promo);
};

/**
 * Update a Promo
 */
exports.update = function (req, res) {
  var promo = req.promo;

  promo = _.extend(promo, req.body);

  promo.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(promo);
    }
  });
};

/**
 * Delete an Promo
 */
exports.delete = function (req, res) {
  var promo = req.promo;

  promo.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(promo);
    }
  });
};

/**
 * List of Promos
 */
exports.list = function (req, res) {
  Promo.find().sort('-created').exec(function (err, promos) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(promos);
    }
  });
};

/**
 * Promo middleware
 */
exports.promoByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Promo is invalid'
    });
  }

  Promo.findById(id).populate('user', 'displayName').exec(function (err, promo) {
    if (err) {
      return next(err);
    } else if (!promo) {
      return res.status(404).send({
        message: 'No Promo with that identifier has been found'
      });
    }
    req.promo = promo;
    next();
  });
};

exports.redeemPromo = function (req, res) {
  var data = req.body;
  if (!data['code'] || data['code'] == null || data['code'] == '') {
    return res.status(400).send({
      message: 'Please Send Promo Code',
      error: err
    });
  }
  Promo.findOne({
    code: data.code,
    start_date: {
      $lte: new Date()
    },
    end_date: {
      $gte: new Date()
    }
  }, function (err, promo) {
    if (err) {
      return res.status(400).send({
        message: 'Database Occurred Error',
        error: err
      });
    } else if (!promo || promo == null) {
      return res.status(400).send({
        message: 'Invalid Promo Code'
      });
    } else {
      var obj = {
        promo: promo._id,
        user: req.user._id,
        code: promo.code,
        is_used: false
      }
      UsedPromoCode.findOne({
        code: promo.code,
        user: req.user._id
      }, function (er, userPromo) {
        if (er) {
          return res.status(400).send({
            message: 'Database Occurred Error',
            error: er
          });
        } else if (!userPromo || userPromo == null || userPromo == '') {
          UsedPromoCode.remove({user: req.user._id });
          UsedPromoCode(obj).save(function (e, usedPromo) {
            if (e) {
              return res.status(400).send({
                message: 'Database Occurred Error',
                error: e
              });
            } else {
              var message = "";
              if (promo.type == 'free_delivery') {
                message = "Congratulation You will Get Free Delivery For One Order";
              }
              if (promo.type == 'shipping_percentage') {
                message = "Congratulation You will Get " + promo.value + "% Discount In Shipping Charges One Order";
              }
              if (promo.type == 'free_shopping') {
                message = "Congratulation You will Get Free Shopping For One Order";
              }
              return res.status(200).send({
                code: 200,
                message: message,
                success: true
              });
            }
          });
        } else {
          return res.status(400).send({
            message: 'Already Used '
          });
        }
      });
    }
  });
}


function isValidDate(input) {
  var date = new Date(input);
  if (!(date && date.getTimezoneOffset && date.setUTCFullYear))
    return false;

  var time = date.getTime();
  return time === time;
};

function compareTwoDates(d1, d2) {
    var a,
        b;
    a = new Date(+d1);
    b = new Date(+d2);
    a.setHours(0, 0, 0, 0);
    b.setHours(0, 0, 0, 0);
    return +a == +b;
}
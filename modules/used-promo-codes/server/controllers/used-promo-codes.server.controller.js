'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    UsedPromoCode = mongoose.model('UsedPromoCode'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    _ = require('lodash');

/**
 * Create a Used promo code
 */
exports.create = function(req, res) {
    var usedPromoCode = new UsedPromoCode(req.body);
    usedPromoCode.user = req.user;

    usedPromoCode.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(usedPromoCode);
        }
    });
};

/**
 * Show the current Used promo code
 */
exports.read = function(req, res) {
    // convert mongoose document to JSON
    var usedPromoCode = req.usedPromoCode ? req.usedPromoCode.toJSON() : {};

    // Add a custom field to the Article, for determining if the current User is the "owner".
    // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
    usedPromoCode.isCurrentUserOwner = req.user && usedPromoCode.user && usedPromoCode.user._id.toString() === req.user._id.toString();

    res.jsonp(usedPromoCode);
};

/**
 * Update a Used promo code
 */
exports.update = function(req, res) {
    var usedPromoCode = req.usedPromoCode;

    usedPromoCode = _.extend(usedPromoCode, req.body);

    usedPromoCode.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(usedPromoCode);
        }
    });
};

/**
 * Delete an Used promo code
 */
exports.delete = function(req, res) {
    var usedPromoCode = req.usedPromoCode;

    usedPromoCode.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(usedPromoCode);
        }
    });
};

/**
 * List of Used promo codes
 */
exports.list = function(req, res) {
    UsedPromoCode.find().sort('-created').populate('user', 'displayName').exec(function(err, usedPromoCodes) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(usedPromoCodes);
        }
    });
};

/**
 * Used promo code middleware
 */
exports.usedPromoCodeByID = function(req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Used promo code is invalid'
        });
    }

    UsedPromoCode.findById(id).populate('user', 'displayName').exec(function(err, usedPromoCode) {
        if (err) {
            return next(err);
        } else if (!usedPromoCode) {
            return res.status(404).send({
                message: 'No Used promo code with that identifier has been found'
            });
        }
        req.usedPromoCode = usedPromoCode;
        next();
    });
};


exports.removePromo = function(req, res) {
    var user = req.user;
    UsedPromoCode.remove({
        user: user._id,
        is_used: false
    }, function(d) {
       // console.log(d);
        res.send({
            code: 200,
            success: true,
            message: "Promo Code Removed"
        });
    });
}
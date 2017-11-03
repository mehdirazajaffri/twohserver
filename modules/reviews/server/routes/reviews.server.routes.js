'use strict';

/**
 * Module dependencies
 */
var reviewsPolicy = require('../policies/reviews.server.policy'),
  reviews = require('../controllers/reviews.server.controller'),
  AuthService = require('../../../authorization');


module.exports = function(app) {
  // Reviews Routes
  app.route('/api/reviews')
    .get(reviews.list)
    .post(AuthService.isUserAllowed,reviews.create);

  app.route('/api/reviews/:reviewId')
    .get(AuthService.isUserAllowed,reviews.read)
    .put(AuthService.isUserAllowed,reviews.update)
    .delete(AuthService.isAdminAllowed,reviews.delete);

  // Finish by binding the Review middleware
  app.param('reviewId', reviews.reviewByID);
};

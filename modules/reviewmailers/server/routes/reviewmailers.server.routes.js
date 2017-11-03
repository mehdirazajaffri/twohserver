'use strict';

/**
 * Module dependencies
 */
var reviewmailersPolicy = require('../policies/reviewmailers.server.policy'),
  reviewmailers = require('../controllers/reviewmailers.server.controller'),
  AuthService = require('../../../authorization');

module.exports = function(app) {
  // Reviewmailers Routes
  app.route('/api/reviewmailers')
    .get(reviewmailers.create)
    .post(AuthService.isAdminAllowed,reviewmailers.create);

  app.route('/api/reviewmailers/:reviewmailerId').all(reviewmailersPolicy.isAllowed)
    .get(reviewmailers.read)
    .put(reviewmailers.update)
    .delete(reviewmailers.delete);

  // Finish by binding the Reviewmailer middleware
  app.param('reviewmailerId', reviewmailers.reviewmailerByID);
};

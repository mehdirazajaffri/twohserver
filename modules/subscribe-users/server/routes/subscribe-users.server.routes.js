'use strict';

/**
 * Module dependencies
 */
var subscribeUsersPolicy = require('../policies/subscribe-users.server.policy'),
  subscribeUsers = require('../controllers/subscribe-users.server.controller'),
  AuthService = require('../../../authorization');

module.exports = function(app) {
  // Subscribe users Routes
  app.route('/api/subscribe-users')
    .get(AuthService.isAdminAllowed,subscribeUsers.list)
    .post(subscribeUsers.create);

  app.route('/api/subscribe-users/:subscribeUserId')
    .get(AuthService.isAdminAllowed,subscribeUsers.read)
    .put(AuthService.isAdminAllowed,subscribeUsers.update)
    .delete(AuthService.isAdminAllowed,subscribeUsers.delete);

  // Finish by binding the Subscribe user middleware
  app.param('subscribeUserId', subscribeUsers.subscribeUserByID);
};

'use strict';

/**
 * Module dependencies
 */
var advertisesPolicy = require('../policies/advertises.server.policy'),
  advertises = require('../controllers/advertises.server.controller'),
  AuthService = require('../../../authorization');

module.exports = function(app) {
  // Advertises Routes
  //.all(advertisesPolicy.isAllowed)
  app.route('/api/advertises')
    .get(advertises.list)
    .post(AuthService.isAdminAllowed,advertises.create);

  app.route('/api/advertises/:advertiseId')
    .get(AuthService.isUserAllowed,advertises.read)
    .put(AuthService.isAdminAllowed,advertises.update)
    .delete(AuthService.isAdminAllowed,advertises.delete);

  // Finish by binding the Advertise middleware
  app.param('advertiseId', advertises.advertiseByID);
};

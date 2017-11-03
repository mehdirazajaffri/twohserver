'use strict';

/**
 * Module dependencies
 */
var brandsuksPolicy = require('../policies/brandsuks.server.policy'),
  brandsuks = require('../controllers/brandsuks.server.controller'),
  AuthService = require('../../../authorization');  

module.exports = function(app) {
  // Brandsuks Routes
  app.route('/api/brandsuks')
    .get(brandsuks.list)
    .post(AuthService.isAdminAllowed,brandsuks.create);

  app.route('/api/brandsuks/:brandsukId')
    .get(AuthService.isUserAllowed,brandsuks.read)
    .put(AuthService.isAdminAllowed,brandsuks.update)
    .delete(AuthService.isAdminAllowed,brandsuks.delete);

  // Finish by binding the Brandsuk middleware
  app.param('brandsukId', brandsuks.brandByID);
};
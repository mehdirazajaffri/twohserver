'use strict';

/**
 * Module dependencies
 */
var ratesuksPolicy = require('../policies/ratesuks.server.policy'),
  ratesuks = require('../controllers/ratesuks.server.controller'),
  AuthService = require('../../../authorization');

module.exports = function(app) {
  // Ratesuks Routes
  app.route('/api/ratesuks').all(ratesuksPolicy.isAllowed)
    .get(ratesuks.list)
    .post(AuthService.isAdminAllowed,ratesuks.create);

  app.route('/api/ratesuks/:ratesukId').all(ratesuksPolicy.isAllowed)
    .get(ratesuks.read)
    .put(AuthService.isAdminAllowed,ratesuks.update)
    .delete(AuthService.isAdminAllowed,ratesuks.delete);
  app.route('/api/update/ratesuks')
    .post(AuthService.isAdminAllowed,ratesuks.updateRates)

  // Finish by binding the Ratesuk middleware
  app.param('ratesukId', ratesuks.ratesukByID);
};

'use strict';

/**
 * Module dependencies
 */
var ratesPolicy = require('../policies/rates.server.policy'),
  rates = require('../controllers/rates.server.controller'),
   AuthService = require('../../../authorization');

module.exports = function(app) {
  // Rates Routes
  app.route('/api/rates').all(ratesPolicy.isAllowed)
    .get(rates.list)
    .post(AuthService.isAdminAllowed,rates.create);

  app.route('/api/rates/:rateId').all(ratesPolicy.isAllowed)
    .get(rates.read)
    .put(AuthService.isAdminAllowed,rates.update)
    .delete(AuthService.isAdminAllowed,rates.delete);
  app.route('/api/update/rates')
  .post(AuthService.isAdminAllowed,rates.updateRates)
  
  // Finish by binding the Rate middleware
  app.param('rateId', rates.rateByID);
};

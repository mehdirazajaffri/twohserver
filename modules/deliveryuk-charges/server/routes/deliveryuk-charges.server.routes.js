'use strict';

/**
 * Module dependencies
 */
var deliveryukChargesPolicy = require('../policies/deliveryuk-charges.server.policy'),
  deliveryukCharges = require('../controllers/deliveryuk-charges.server.controller'),
  AuthService = require('../../../authorization');

module.exports = function(app) {
  // Deliveryuk charges Routes
  app.route('/api/deliveryuk-charges').all(deliveryukChargesPolicy.isAllowed)
    .get(AuthService.isUserAllowed,deliveryukCharges.list)
    .post(AuthService.isUserAllowed,deliveryukCharges.create);

  app.route('/api/deliveryuk-charges/:deliveryukChargeId').all(deliveryukChargesPolicy.isAllowed)
    .get(deliveryukCharges.read)
    .put(AuthService.isAdminAllowed,deliveryukCharges.update)
    .delete(AuthService.isAdminAllowed,deliveryukCharges.delete);

  // Finish by binding the Deliveryuk charge middleware
  app.param('deliveryukChargeId', deliveryukCharges.deliveryChargeByID);
};

'use strict';

/**
 * Module dependencies
 */
var deliveryChargesPolicy = require('../policies/delivery-charges.server.policy'),
  deliveryCharges = require('../controllers/delivery-charges.server.controller'),
  AuthService = require('../../../authorization');

module.exports = function(app) {
  // Delivery charges Routes
  app.route('/api/delivery-charges').all(deliveryChargesPolicy.isAllowed)
    .get(AuthService.isUserAllowed,deliveryCharges.list)
    .post(AuthService.isUserAllowed,deliveryCharges.create);

  app.route('/api/delivery-charges/:deliveryChargeId').all(deliveryChargesPolicy.isAllowed)
    .get(deliveryCharges.read)
    .put(AuthService.isAdminAllowed,deliveryCharges.update)
    .delete(AuthService.isUserAllowed,deliveryCharges.delete);

  // Finish by binding the Delivery charge middleware
  app.param('deliveryChargeId', deliveryCharges.deliveryChargeByID);
};

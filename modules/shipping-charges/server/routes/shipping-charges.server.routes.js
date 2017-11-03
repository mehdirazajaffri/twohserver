'use strict';

/**
 * Module dependencies
 */
var shippingChargesPolicy = require('../policies/shipping-charges.server.policy'),
  shippingCharges = require('../controllers/shipping-charges.server.controller'),
      AuthService = require('../../../authorization');


module.exports = function(app) {
  // Shipping charges Routes
  //.all(shippingChargesPolicy.isAllowed)
  app.route('/api/shipping-charges')
    .get(shippingCharges.list)
    .post(AuthService.isAdminAllowed,shippingCharges.create);

  app.route('/api/shipping-charges/:shippingChargeId')
    .get(shippingCharges.read)
    .put(AuthService.isAdminAllowed,shippingCharges.update)
    .delete(AuthService.isAdminAllowed,shippingCharges.delete);
  // Finish by binding the Shipping charge middleware

  app.route('/api/shipping-charges/:id/subdocuments/:sub_id')
  .post(AuthService.isAdminAllowed,shippingCharges.updateByID);
  app.param('shippingChargeId', shippingCharges.shippingChargeByID);
};

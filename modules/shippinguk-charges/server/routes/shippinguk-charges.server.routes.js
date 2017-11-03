'use strict';

/**
 * Module dependencies
 */
var shippingukChargesPolicy = require('../policies/shippinguk-charges.server.policy'),
  shippingukCharges = require('../controllers/shippinguk-charges.server.controller'),
  AuthService = require('../../../authorization');

module.exports = function(app) {
  // Shippinguk charges Routes
  app.route('/api/shippinguk-charges')
    .get(shippingukCharges.list)
    .post(AuthService.isAdminAllowed,shippingukCharges.create);

  app.route('/api/shippinguk-charges/:shippingukChargeId')
    .get(shippingukCharges.read)
    .put(AuthService.isAdminAllowed,shippingukCharges.update)
    .delete(AuthService.isAdminAllowed,shippingukCharges.delete);

  // Finish by binding the Shippinguk charge middleware
  app.route('/api/shipping-charges/:id/subdocuments/:sub_id')
  .post(AuthService.isAdminAllowed,shippingukCharges.updateByID);
  app.param('shippingukChargeId', shippingukCharges.shippingChargeByID);

};

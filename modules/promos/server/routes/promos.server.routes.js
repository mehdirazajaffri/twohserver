'use strict';

/**
 * Module dependencies
 */
var promosPolicy = require('../policies/promos.server.policy'),
  promos = require('../controllers/promos.server.controller'),
   AuthService = require('../../../authorization');

module.exports = function(app) {
  // Promos Routes
  app.route('/api/promos')
    .get(AuthService.isAdminAllowed,promos.list)
    .post(AuthService.isAdminAllowed,promos.create);

  app.route('/api/promos/:promoId')
    .get(AuthService.isAdminAllowed,promos.read)
    .put(AuthService.isAdminAllowed,promos.update)
    .delete(AuthService.isAdminAllowed,promos.delete);

  app.route('/api/redeem/promo')
    .post(AuthService.isUserAllowed,promos.redeemPromo)
  // Finish by binding the Promo middleware
  app.param('promoId', promos.promoByID);
};

'use strict';

/**
 * Module dependencies
 */
var promotionBarsPolicy = require('../policies/promotion-bars.server.policy'),
  promotionBars = require('../controllers/promotion-bars.server.controller'),
    AuthService = require('../../../authorization');


module.exports = function(app) {
  // Promotion bars Routes
  app.route('/api/promotion-bars')
    .get(promotionBars.list)
    .post(AuthService.isAdminAllowed,promotionBars.create);

  app.route('/api/promotion-bars/:promotionBarId')
    .get(AuthService.isAdminAllowed,promotionBars.read)
    .put(AuthService.isAdminAllowed,promotionBars.update)
    .delete(AuthService.isAdminAllowed,promotionBars.delete);

  // Finish by binding the Promotion bar middleware
  app.param('promotionBarId', promotionBars.promotionBarByID);
};

'use strict';

/**
 * Module dependencies
 */
var brandsPolicy = require('../policies/brands.server.policy'),
  brands = require('../controllers/brands.server.controller'),
    AuthService = require('../../../authorization');


module.exports = function(app) {
  // Brands Routes
  //.all(brandsPolicy.isAllowed)
  app.route('/api/brands')
    .get(brands.list)
    .post(AuthService.isAdminAllowed,brands.create);

  app.route('/api/brands/:brandId')
    .get(AuthService.isUserAllowed,brands.read)
    .put(AuthService.isAdminAllowed,brands.update)
    .delete(AuthService.isAdminAllowed,brands.delete);

  // Finish by binding the Brand middleware
  app.param('brandId', brands.brandByID);
};

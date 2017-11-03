'use strict';

/**
 * Module dependencies
 */
var productsPolicy = require('../policies/products.server.policy'),
  products = require('../controllers/products.server.controller'),
   AuthService = require('../../../authorization');

module.exports = function(app) {
  // Products Routes
  //.all(productsPolicy.isAllowed)
  app.route('/api/products')
    .get(AuthService.isUserAllowed,products.list)
    .post(AuthService.isAdminAllowed,products.create);

  app.route('/api/products/:productId')
    .get(products.read)
    .put(AuthService.isAdminAllowed,products.update)
    .delete(AuthService.isAdminAllowed,products.delete);

  // Finish by binding the Product middleware
  app.param('productId', products.productByID);
};

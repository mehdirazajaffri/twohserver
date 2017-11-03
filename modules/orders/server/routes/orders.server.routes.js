'use strict';

/**
 * Module dependencies
 */
var ordersPolicy = require('../policies/orders.server.policy'),
  orders = require('../controllers/orders.server.controller'),
  AuthService = require('../../../authorization');

module.exports = function(app) {
  // Orders Routes
  //.all(ordersPolicy.isAllowed)
  app.route('/api/orders')
    .get(AuthService.isAdminAllowed,orders.list)
    .post(AuthService.isUserAllowed,orders.orderAdding);

  app.route('/api/orders/:orderId')
    .get(AuthService.isUserAllowed,orders.read)
    .put(AuthService.isUserAllowed,orders.update)
    .delete(AuthService.isUserAllowed,orders.delete);
  app.route('/api/orders/checkrates')
    .post(AuthService.isUserAllowed,orders.orderChecking); 
  app.route('/api/orders/updatesecuritydeposit/:id')
  .put(AuthService.isAdminAllowed,orders.updateOrders);  
  app.route('/api/ordersAll')
    .get( AuthService.isUserAllowed,orders.getAllOrders);   
 // app.route('/api/text').post( AuthService.isUserAllowed,orders.orderAdding);
  app.route('/api/orders/search').get(AuthService.isAdminAllowed,orders.filter);
  // Finish by binding the Order middleware
  app.param('orderId', orders.orderByID);
};

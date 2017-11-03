'use strict';

/**
 * Module dependencies
 */
var ordersuksPolicy = require('../policies/ordersuks.server.policy'),
ordersuks = require('../controllers/ordersuks.server.controller'),
AuthService = require('../../../authorization');

module.exports = function(app) {
// Orders Routes
//.all(ordersPolicy.isAllowed)
app.route('/api/ordersuks')
  .get(AuthService.isAdminAllowed,ordersuks.list)
  .post(AuthService.isUserAllowed,ordersuks.orderAdding);

app.route('/api/ordersuks/:orderId')
  .get(AuthService.isUserAllowed,ordersuks.read)
  .put(AuthService.isUserAllowed,ordersuks.update)
  .delete(AuthService.isUserAllowed,ordersuks.delete);
app.route('/api/ordersuks/checkrates')
  .post(AuthService.isUserAllowed,ordersuks.orderChecking); 
app.route('/api/ordersuks/updatesecuritydeposit/:id')
.put(AuthService.isAdminAllowed,ordersuks.updateOrders);  
app.route('/api/ordersAlluk')
  .get( AuthService.isUserAllowed,ordersuks.getAllOrders);   
// app.route('/api/text').post( AuthService.isUserAllowed,orders.orderAdding);
app.route('/api/ordersuks/search').get(AuthService.isAdminAllowed,ordersuks.filter);
// Finish by binding the Order middleware
app.param('orderId', ordersuks.orderByID);
};

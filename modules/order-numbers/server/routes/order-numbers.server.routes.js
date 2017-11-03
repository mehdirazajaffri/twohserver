'use strict';

/**
 * Module dependencies
 */
var orderNumbersPolicy = require('../policies/order-numbers.server.policy'),
  orderNumbers = require('../controllers/order-numbers.server.controller');

module.exports = function(app) {
  // Order numbers Routes
  app.route('/api/order-numbers').all(orderNumbersPolicy.isAllowed)
    .get(orderNumbers.list)
    .post(orderNumbers.create);

  app.route('/api/order-numbers/:orderNumberId').all(orderNumbersPolicy.isAllowed)
    .get(orderNumbers.read)
    .put(orderNumbers.update)
    .delete(orderNumbers.delete);

  // Finish by binding the Order number middleware
  app.param('orderNumberId', orderNumbers.orderNumberByID);
};

'use strict';

/**
 * Module dependencies
 */
var itemsPolicy = require('../policies/items.server.policy'),
  items = require('../controllers/items.server.controller'),
   AuthService = require('../../../authorization');

module.exports = function(app) {
  // Items Routes
  //.all(itemsPolicy.isAllowed)
  app.route('/api/items')
    .get(items.list)
    .post(AuthService.isAdminAllowed,items.create);

  app.route('/api/items/:itemId')
    .get(AuthService.isUserAllowed,items.read)
    .put(AuthService.isUserAllowed,items.update)
    .delete(AuthService.isAdminAllowed,items.delete);

  // Finish by binding the Item middleware
  app.param('itemId', items.itemByID);
};

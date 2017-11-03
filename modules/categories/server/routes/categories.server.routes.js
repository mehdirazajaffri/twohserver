'use strict';

/**
 * Module dependencies
 */
var categoriesPolicy = require('../policies/categories.server.policy'),
  categories = require('../controllers/categories.server.controller'),
    AuthService = require('../../../authorization');

module.exports = function(app) {
  // Categories Routes
  //.all(categoriesPolicy.isAllowed)
  app.route('/api/categories')
    .get(categories.list)
    .post(AuthService.isAdminAllowed,categories.create);

  app.route('/api/categories/:categoryId')
    .get(categories.read)
    .put(AuthService.isAdminAllowed,categories.update)
    .delete(AuthService.isAdminAllowed,categories.delete);

  // Finish by binding the Category middleware
  app.param('categoryId', categories.categoryByID);
};

'use strict';

/**
 * Module dependencies
 */
var brandCategoriesPolicy = require('../policies/brand-categories.server.policy'),
  brandCategories = require('../controllers/brand-categories.server.controller');

module.exports = function(app) {
  // Brand categories Routes
  app.route('/api/brand-categories')
    .get(brandCategories.list)
    .post(brandCategories.create);

  app.route('/api/brand-categories/:brandCategoryId')
    .get(brandCategories.read)
    .put(brandCategories.update)
    .delete(brandCategories.delete);

  app.route('/api/brand-categories-add')
  .post(brandCategories.createCategory);  

  // Finish by binding the Brand category middleware
  app.param('brandCategoryId', brandCategories.brandCategoryByID);
};

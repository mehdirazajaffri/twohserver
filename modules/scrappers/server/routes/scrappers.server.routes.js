'use strict';

/**
 * Module dependencies
 */
var scrappersPolicy = require('../policies/scrappers.server.policy'),
  scrappers = require('../controllers/scrappers.server.controller'),
  AuthService = require('../../../authorization');

module.exports = function(app) {
  // Scrappers Routes
  app.route('/api/scrappers')
    .get(scrappers.list)
    .post(AuthService.isUserAllowed,scrappers.create);

  app.route('/api/scrappers/:scrapperId').all(scrappersPolicy.isAllowed)
    .get(scrappers.read)
    .put(scrappers.update)
    .delete(scrappers.delete);

  // Finish by binding the Scrapper middleware
  app.param('scrapperId', scrappers.scrapperByID);
};

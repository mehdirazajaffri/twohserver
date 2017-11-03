'use strict';

/**
 * Module dependencies
 */
var settingsPolicy = require('../policies/settings.server.policy'),
  settings = require('../controllers/settings.server.controller'),
    AuthService = require('../../../authorization');


module.exports = function(app) {
  // Settings Routes
  app.route('/api/settings')
    .get(AuthService.isAdminAllowed,settings.list)
    .post(AuthService.isAdminAllowed,settings.create);

  app.route('/api/settings/:settingId')
    .get(AuthService.isAdminAllowed,settings.read)
    .put(AuthService.isAdminAllowed,settings.update)
    .delete(AuthService.isAdminAllowed,settings.delete);

  // Finish by binding the Setting middleware
  app.param('settingId', settings.settingByID);
};

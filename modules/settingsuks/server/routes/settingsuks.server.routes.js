'use strict';

/**
 * Module dependencies
 */
var settingsuksPolicy = require('../policies/settingsuks.server.policy'),
  settingsuks = require('../controllers/settingsuks.server.controller'),
  AuthService = require('../../../authorization');

module.exports = function(app) {
  // Settingsuks Routes
  app.route('/api/settingsuks')
    .get(AuthService.isAdminAllowed,settingsuks.list)
    .post(AuthService.isAdminAllowed,settingsuks.create);

  app.route('/api/settingsuks/:settingsukId')
    .get(AuthService.isAdminAllowed,settingsuks.read)
    .put(AuthService.isAdminAllowed,settingsuks.update)
    .delete(AuthService.isAdminAllowed,settingsuks.delete);

  // Finish by binding the Settingsuk middleware
  app.param('settingsukId', settingsuks.settingsukByID);
};

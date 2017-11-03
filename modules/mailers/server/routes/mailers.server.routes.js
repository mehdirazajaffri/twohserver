'use strict';

/**
 * Module dependencies
 */
var mailersPolicy = require('../policies/mailers.server.policy'),
  mailers = require('../controllers/mailers.server.controller');

module.exports = function(app) {
  // Mailers Routes
  app.route('/api/mailers').all(mailersPolicy.isAllowed)
    .get(mailers.list)
    .post(mailers.create);

  app.route('/api/mailers/:mailerId').all(mailersPolicy.isAllowed)
    .get(mailers.read)
    .put(mailers.update)
    .delete(mailers.delete);

  // Finish by binding the Mailer middleware
  app.param('mailerId', mailers.mailerByID);
};

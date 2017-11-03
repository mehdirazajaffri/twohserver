'use strict';

/**
 * Module dependencies
 */
var dealsPolicy = require('../policies/deals.server.policy'),
    deals = require('../controllers/deals.server.controller'),
    AuthService = require('../../../authorization');

module.exports = function(app) {
    // Deals Routes
    // app.route('/api/deals').all(dealsPolicy.isAllowed)
    //   .get(deals.list)
    //   .post(deals.create);
    app.route('/api/deals')
        .get(deals.list)
        .post(AuthService.isAdminAllowed,deals.create);

    // app.route('/api/deals/:dealId').all(dealsPolicy.isAllowed)
    //     .get(deals.read)
    //     .put(deals.update)
    //     .delete(deals.delete);
    app.route('/api/deals/:dealId')
        .get(AuthService.isUserAllowed,deals.read)
        .put(AuthService.isAdminAllowed,deals.update)
        .delete(AuthService.isAdminAllowed,deals.delete);

    // Finish by binding the Deal middleware
    app.param('dealId', deals.dealByID);
};
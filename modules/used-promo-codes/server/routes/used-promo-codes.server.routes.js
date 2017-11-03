'use strict';

/**
 * Module dependencies
 */
var usedPromoCodesPolicy = require('../policies/used-promo-codes.server.policy'),
    AuthService = require('../../../authorization'),
    usedPromoCodes = require('../controllers/used-promo-codes.server.controller');

module.exports = function(app) {
    // Used promo codes Routes
    app.route('/api/used-promo-codes').all(usedPromoCodesPolicy.isAllowed)
        .get(usedPromoCodes.list)
        .post(usedPromoCodes.create);

    app.route('/api/used-promo-codes/remove').post(AuthService.isUserAllowed, usedPromoCodes.removePromo);
    app.route('/api/used-promo-codes/:usedPromoCodeId').all(usedPromoCodesPolicy.isAllowed)
        .get(usedPromoCodes.read)
        .put(usedPromoCodes.update)
        .delete(usedPromoCodes.delete);
    // Finish by binding the Used promo code middleware
    app.param('usedPromoCodeId', usedPromoCodes.usedPromoCodeByID);
};
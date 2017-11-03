'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Used promo codes Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/used-promo-codes',
      permissions: '*'
    }, {
      resources: '/api/used-promo-codes/:usedPromoCodeId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/used-promo-codes',
      permissions: ['get', 'post']
    }, {
      resources: '/api/used-promo-codes/:usedPromoCodeId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/used-promo-codes',
      permissions: ['get']
    }, {
      resources: '/api/used-promo-codes/:usedPromoCodeId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Used promo codes Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Used promo code is being processed and the current user created it then allow any manipulation
  if (req.usedPromoCode && req.user && req.usedPromoCode.user && req.usedPromoCode.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};

'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Shippinguk charges Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/shippinguk-charges',
      permissions: '*'
    }, {
      resources: '/api/shippinguk-charges/:shippingukChargeId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/shippinguk-charges',
      permissions: ['get', 'post']
    }, {
      resources: '/api/shippinguk-charges/:shippingukChargeId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/shippinguk-charges',
      permissions: ['get']
    }, {
      resources: '/api/shippinguk-charges/:shippingukChargeId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Shippinguk charges Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Shippinguk charge is being processed and the current user created it then allow any manipulation
  if (req.shippingukCharge && req.user && req.shippingukCharge.user && req.shippingukCharge.user.id === req.user.id) {
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

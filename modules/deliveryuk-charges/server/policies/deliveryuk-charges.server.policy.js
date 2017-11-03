'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Deliveryuk charges Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/deliveryuk-charges',
      permissions: '*'
    }, {
      resources: '/api/deliveryuk-charges/:deliveryukChargeId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/deliveryuk-charges',
      permissions: ['get', 'post']
    }, {
      resources: '/api/deliveryuk-charges/:deliveryukChargeId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/deliveryuk-charges',
      permissions: ['get']
    }, {
      resources: '/api/deliveryuk-charges/:deliveryukChargeId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Deliveryuk charges Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Deliveryuk charge is being processed and the current user created it then allow any manipulation
  if (req.deliveryukCharge && req.user && req.deliveryukCharge.user && req.deliveryukCharge.user.id === req.user.id) {
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

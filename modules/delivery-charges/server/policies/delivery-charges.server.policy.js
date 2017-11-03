'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Delivery charges Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/delivery-charges',
      permissions: '*'
    }, {
      resources: '/api/delivery-charges/:deliveryChargeId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/delivery-charges',
      permissions: ['get', 'post']
    }, {
      resources: '/api/delivery-charges/:deliveryChargeId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/delivery-charges',
      permissions: ['get']
    }, {
      resources: '/api/delivery-charges/:deliveryChargeId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Delivery charges Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Delivery charge is being processed and the current user created it then allow any manipulation
  if (req.deliveryCharge && req.user && req.deliveryCharge.user && req.deliveryCharge.user.id === req.user.id) {
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

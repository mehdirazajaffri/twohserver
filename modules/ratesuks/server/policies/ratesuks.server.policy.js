'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Ratesuks Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/ratesuks',
      permissions: '*'
    }, {
      resources: '/api/ratesuks/:ratesukId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/ratesuks',
      permissions: ['get', 'post']
    }, {
      resources: '/api/ratesuks/:ratesukId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/ratesuks',
      permissions: ['get']
    }, {
      resources: '/api/ratesuks/:ratesukId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Ratesuks Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Ratesuk is being processed and the current user created it then allow any manipulation
  if (req.ratesuk && req.user && req.ratesuk.user && req.ratesuk.user.id === req.user.id) {
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

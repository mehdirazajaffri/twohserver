'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Subscribe users Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/subscribe-users',
      permissions: '*'
    }, {
      resources: '/api/subscribe-users/:subscribeUserId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/subscribe-users',
      permissions: ['get', 'post']
    }, {
      resources: '/api/subscribe-users/:subscribeUserId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/subscribe-users',
      permissions: ['get']
    }, {
      resources: '/api/subscribe-users/:subscribeUserId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Subscribe users Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Subscribe user is being processed and the current user created it then allow any manipulation
  if (req.subscribeUser && req.user && req.subscribeUser.user && req.subscribeUser.user.id === req.user.id) {
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

'use strict';

/**
 * Module dependencies
 */
var blogsPolicy = require('../policies/blogs.server.policy'),
  blogs = require('../controllers/blogs.server.controller'),
    AuthService = require('../../../authorization');


module.exports = function(app) {
  // Blogs Routes
  app.route('/api/blogs')
    .get(blogs.list)
    .post(AuthService.isAdminAllowed,blogs.create);

  app.route('/api/blogs/:blogId')
    .get(blogs.read)
    .put(AuthService.isAdminAllowed,blogs.update)
    .delete(AuthService.isAdminAllowed,blogs.delete);

  // Finish by binding the Blog middleware
  app.param('blogId', blogs.blogByID);
};

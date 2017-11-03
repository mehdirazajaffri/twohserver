'use strict';

module.exports = function (app) {
  // User Routes
  var multer = require('multer');
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  var upload = multer({storage: storage});
  var users = require('../controllers/users.server.controller');
  var email = require('../controllers/sendEmail.controller');
  var userProfile = require('../controllers/users/users.profile.server.controller'),
        AuthService = require('../../../authorization');


  // Setting up the users profile api
  app
    .route('/api/users/me')
    .get(users.me);
  app
    .route('/api/users')
    .put(AuthService.isUserAllowed,users.update);
  app
    .route('/api/users/accounts')
    .delete(users.removeOAuthProvider);
  app
    .route('/api/users/password')
    .post(users.changePassword);
  app
    .route('/api/users/picture')
    .post(users.changeProfilePicture);
  app
    .route('/api/users/fileupload')
    .post(upload.single('avatar'), userProfile.fileUpload);
  app
    .route('/api/contact-us')
    .post(email.sendEmail);
  app
    .route('/api/exports/users')
    .get(users.exportsUser);

  // Finish by binding the user middleware
  app.param('userId', users.userByID);
};

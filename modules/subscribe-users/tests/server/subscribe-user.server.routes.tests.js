'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  SubscribeUser = mongoose.model('SubscribeUser'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  subscribeUser;

/**
 * Subscribe user routes tests
 */
describe('Subscribe user CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Subscribe user
    user.save(function () {
      subscribeUser = {
        name: 'Subscribe user name'
      };

      done();
    });
  });

  it('should be able to save a Subscribe user if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Subscribe user
        agent.post('/api/subscribeUsers')
          .send(subscribeUser)
          .expect(200)
          .end(function (subscribeUserSaveErr, subscribeUserSaveRes) {
            // Handle Subscribe user save error
            if (subscribeUserSaveErr) {
              return done(subscribeUserSaveErr);
            }

            // Get a list of Subscribe users
            agent.get('/api/subscribeUsers')
              .end(function (subscribeUsersGetErr, subscribeUsersGetRes) {
                // Handle Subscribe users save error
                if (subscribeUsersGetErr) {
                  return done(subscribeUsersGetErr);
                }

                // Get Subscribe users list
                var subscribeUsers = subscribeUsersGetRes.body;

                // Set assertions
                (subscribeUsers[0].user._id).should.equal(userId);
                (subscribeUsers[0].name).should.match('Subscribe user name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Subscribe user if not logged in', function (done) {
    agent.post('/api/subscribeUsers')
      .send(subscribeUser)
      .expect(403)
      .end(function (subscribeUserSaveErr, subscribeUserSaveRes) {
        // Call the assertion callback
        done(subscribeUserSaveErr);
      });
  });

  it('should not be able to save an Subscribe user if no name is provided', function (done) {
    // Invalidate name field
    subscribeUser.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Subscribe user
        agent.post('/api/subscribeUsers')
          .send(subscribeUser)
          .expect(400)
          .end(function (subscribeUserSaveErr, subscribeUserSaveRes) {
            // Set message assertion
            (subscribeUserSaveRes.body.message).should.match('Please fill Subscribe user name');

            // Handle Subscribe user save error
            done(subscribeUserSaveErr);
          });
      });
  });

  it('should be able to update an Subscribe user if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Subscribe user
        agent.post('/api/subscribeUsers')
          .send(subscribeUser)
          .expect(200)
          .end(function (subscribeUserSaveErr, subscribeUserSaveRes) {
            // Handle Subscribe user save error
            if (subscribeUserSaveErr) {
              return done(subscribeUserSaveErr);
            }

            // Update Subscribe user name
            subscribeUser.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Subscribe user
            agent.put('/api/subscribeUsers/' + subscribeUserSaveRes.body._id)
              .send(subscribeUser)
              .expect(200)
              .end(function (subscribeUserUpdateErr, subscribeUserUpdateRes) {
                // Handle Subscribe user update error
                if (subscribeUserUpdateErr) {
                  return done(subscribeUserUpdateErr);
                }

                // Set assertions
                (subscribeUserUpdateRes.body._id).should.equal(subscribeUserSaveRes.body._id);
                (subscribeUserUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Subscribe users if not signed in', function (done) {
    // Create new Subscribe user model instance
    var subscribeUserObj = new SubscribeUser(subscribeUser);

    // Save the subscribeUser
    subscribeUserObj.save(function () {
      // Request Subscribe users
      request(app).get('/api/subscribeUsers')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Subscribe user if not signed in', function (done) {
    // Create new Subscribe user model instance
    var subscribeUserObj = new SubscribeUser(subscribeUser);

    // Save the Subscribe user
    subscribeUserObj.save(function () {
      request(app).get('/api/subscribeUsers/' + subscribeUserObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', subscribeUser.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Subscribe user with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/subscribeUsers/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Subscribe user is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Subscribe user which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Subscribe user
    request(app).get('/api/subscribeUsers/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Subscribe user with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Subscribe user if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Subscribe user
        agent.post('/api/subscribeUsers')
          .send(subscribeUser)
          .expect(200)
          .end(function (subscribeUserSaveErr, subscribeUserSaveRes) {
            // Handle Subscribe user save error
            if (subscribeUserSaveErr) {
              return done(subscribeUserSaveErr);
            }

            // Delete an existing Subscribe user
            agent.delete('/api/subscribeUsers/' + subscribeUserSaveRes.body._id)
              .send(subscribeUser)
              .expect(200)
              .end(function (subscribeUserDeleteErr, subscribeUserDeleteRes) {
                // Handle subscribeUser error error
                if (subscribeUserDeleteErr) {
                  return done(subscribeUserDeleteErr);
                }

                // Set assertions
                (subscribeUserDeleteRes.body._id).should.equal(subscribeUserSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Subscribe user if not signed in', function (done) {
    // Set Subscribe user user
    subscribeUser.user = user;

    // Create new Subscribe user model instance
    var subscribeUserObj = new SubscribeUser(subscribeUser);

    // Save the Subscribe user
    subscribeUserObj.save(function () {
      // Try deleting Subscribe user
      request(app).delete('/api/subscribeUsers/' + subscribeUserObj._id)
        .expect(403)
        .end(function (subscribeUserDeleteErr, subscribeUserDeleteRes) {
          // Set message assertion
          (subscribeUserDeleteRes.body.message).should.match('User is not authorized');

          // Handle Subscribe user error error
          done(subscribeUserDeleteErr);
        });

    });
  });

  it('should be able to get a single Subscribe user that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Subscribe user
          agent.post('/api/subscribeUsers')
            .send(subscribeUser)
            .expect(200)
            .end(function (subscribeUserSaveErr, subscribeUserSaveRes) {
              // Handle Subscribe user save error
              if (subscribeUserSaveErr) {
                return done(subscribeUserSaveErr);
              }

              // Set assertions on new Subscribe user
              (subscribeUserSaveRes.body.name).should.equal(subscribeUser.name);
              should.exist(subscribeUserSaveRes.body.user);
              should.equal(subscribeUserSaveRes.body.user._id, orphanId);

              // force the Subscribe user to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Subscribe user
                    agent.get('/api/subscribeUsers/' + subscribeUserSaveRes.body._id)
                      .expect(200)
                      .end(function (subscribeUserInfoErr, subscribeUserInfoRes) {
                        // Handle Subscribe user error
                        if (subscribeUserInfoErr) {
                          return done(subscribeUserInfoErr);
                        }

                        // Set assertions
                        (subscribeUserInfoRes.body._id).should.equal(subscribeUserSaveRes.body._id);
                        (subscribeUserInfoRes.body.name).should.equal(subscribeUser.name);
                        should.equal(subscribeUserInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      SubscribeUser.remove().exec(done);
    });
  });
});

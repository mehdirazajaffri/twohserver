'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Settingsuk = mongoose.model('Settingsuk'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  settingsuk;

/**
 * Settingsuk routes tests
 */
describe('Settingsuk CRUD tests', function () {

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

    // Save a user to the test db and create new Settingsuk
    user.save(function () {
      settingsuk = {
        name: 'Settingsuk name'
      };

      done();
    });
  });

  it('should be able to save a Settingsuk if logged in', function (done) {
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

        // Save a new Settingsuk
        agent.post('/api/settingsuks')
          .send(settingsuk)
          .expect(200)
          .end(function (settingsukSaveErr, settingsukSaveRes) {
            // Handle Settingsuk save error
            if (settingsukSaveErr) {
              return done(settingsukSaveErr);
            }

            // Get a list of Settingsuks
            agent.get('/api/settingsuks')
              .end(function (settingsuksGetErr, settingsuksGetRes) {
                // Handle Settingsuks save error
                if (settingsuksGetErr) {
                  return done(settingsuksGetErr);
                }

                // Get Settingsuks list
                var settingsuks = settingsuksGetRes.body;

                // Set assertions
                (settingsuks[0].user._id).should.equal(userId);
                (settingsuks[0].name).should.match('Settingsuk name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Settingsuk if not logged in', function (done) {
    agent.post('/api/settingsuks')
      .send(settingsuk)
      .expect(403)
      .end(function (settingsukSaveErr, settingsukSaveRes) {
        // Call the assertion callback
        done(settingsukSaveErr);
      });
  });

  it('should not be able to save an Settingsuk if no name is provided', function (done) {
    // Invalidate name field
    settingsuk.name = '';

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

        // Save a new Settingsuk
        agent.post('/api/settingsuks')
          .send(settingsuk)
          .expect(400)
          .end(function (settingsukSaveErr, settingsukSaveRes) {
            // Set message assertion
            (settingsukSaveRes.body.message).should.match('Please fill Settingsuk name');

            // Handle Settingsuk save error
            done(settingsukSaveErr);
          });
      });
  });

  it('should be able to update an Settingsuk if signed in', function (done) {
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

        // Save a new Settingsuk
        agent.post('/api/settingsuks')
          .send(settingsuk)
          .expect(200)
          .end(function (settingsukSaveErr, settingsukSaveRes) {
            // Handle Settingsuk save error
            if (settingsukSaveErr) {
              return done(settingsukSaveErr);
            }

            // Update Settingsuk name
            settingsuk.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Settingsuk
            agent.put('/api/settingsuks/' + settingsukSaveRes.body._id)
              .send(settingsuk)
              .expect(200)
              .end(function (settingsukUpdateErr, settingsukUpdateRes) {
                // Handle Settingsuk update error
                if (settingsukUpdateErr) {
                  return done(settingsukUpdateErr);
                }

                // Set assertions
                (settingsukUpdateRes.body._id).should.equal(settingsukSaveRes.body._id);
                (settingsukUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Settingsuks if not signed in', function (done) {
    // Create new Settingsuk model instance
    var settingsukObj = new Settingsuk(settingsuk);

    // Save the settingsuk
    settingsukObj.save(function () {
      // Request Settingsuks
      request(app).get('/api/settingsuks')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Settingsuk if not signed in', function (done) {
    // Create new Settingsuk model instance
    var settingsukObj = new Settingsuk(settingsuk);

    // Save the Settingsuk
    settingsukObj.save(function () {
      request(app).get('/api/settingsuks/' + settingsukObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', settingsuk.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Settingsuk with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/settingsuks/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Settingsuk is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Settingsuk which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Settingsuk
    request(app).get('/api/settingsuks/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Settingsuk with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Settingsuk if signed in', function (done) {
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

        // Save a new Settingsuk
        agent.post('/api/settingsuks')
          .send(settingsuk)
          .expect(200)
          .end(function (settingsukSaveErr, settingsukSaveRes) {
            // Handle Settingsuk save error
            if (settingsukSaveErr) {
              return done(settingsukSaveErr);
            }

            // Delete an existing Settingsuk
            agent.delete('/api/settingsuks/' + settingsukSaveRes.body._id)
              .send(settingsuk)
              .expect(200)
              .end(function (settingsukDeleteErr, settingsukDeleteRes) {
                // Handle settingsuk error error
                if (settingsukDeleteErr) {
                  return done(settingsukDeleteErr);
                }

                // Set assertions
                (settingsukDeleteRes.body._id).should.equal(settingsukSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Settingsuk if not signed in', function (done) {
    // Set Settingsuk user
    settingsuk.user = user;

    // Create new Settingsuk model instance
    var settingsukObj = new Settingsuk(settingsuk);

    // Save the Settingsuk
    settingsukObj.save(function () {
      // Try deleting Settingsuk
      request(app).delete('/api/settingsuks/' + settingsukObj._id)
        .expect(403)
        .end(function (settingsukDeleteErr, settingsukDeleteRes) {
          // Set message assertion
          (settingsukDeleteRes.body.message).should.match('User is not authorized');

          // Handle Settingsuk error error
          done(settingsukDeleteErr);
        });

    });
  });

  it('should be able to get a single Settingsuk that has an orphaned user reference', function (done) {
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

          // Save a new Settingsuk
          agent.post('/api/settingsuks')
            .send(settingsuk)
            .expect(200)
            .end(function (settingsukSaveErr, settingsukSaveRes) {
              // Handle Settingsuk save error
              if (settingsukSaveErr) {
                return done(settingsukSaveErr);
              }

              // Set assertions on new Settingsuk
              (settingsukSaveRes.body.name).should.equal(settingsuk.name);
              should.exist(settingsukSaveRes.body.user);
              should.equal(settingsukSaveRes.body.user._id, orphanId);

              // force the Settingsuk to have an orphaned user reference
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

                    // Get the Settingsuk
                    agent.get('/api/settingsuks/' + settingsukSaveRes.body._id)
                      .expect(200)
                      .end(function (settingsukInfoErr, settingsukInfoRes) {
                        // Handle Settingsuk error
                        if (settingsukInfoErr) {
                          return done(settingsukInfoErr);
                        }

                        // Set assertions
                        (settingsukInfoRes.body._id).should.equal(settingsukSaveRes.body._id);
                        (settingsukInfoRes.body.name).should.equal(settingsuk.name);
                        should.equal(settingsukInfoRes.body.user, undefined);

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
      Settingsuk.remove().exec(done);
    });
  });
});

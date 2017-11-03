'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Advertise = mongoose.model('Advertise'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  advertise;

/**
 * Advertise routes tests
 */
describe('Advertise CRUD tests', function () {

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

    // Save a user to the test db and create new Advertise
    user.save(function () {
      advertise = {
        name: 'Advertise name'
      };

      done();
    });
  });

  it('should be able to save a Advertise if logged in', function (done) {
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

        // Save a new Advertise
        agent.post('/api/advertises')
          .send(advertise)
          .expect(200)
          .end(function (advertiseSaveErr, advertiseSaveRes) {
            // Handle Advertise save error
            if (advertiseSaveErr) {
              return done(advertiseSaveErr);
            }

            // Get a list of Advertises
            agent.get('/api/advertises')
              .end(function (advertisesGetErr, advertisesGetRes) {
                // Handle Advertises save error
                if (advertisesGetErr) {
                  return done(advertisesGetErr);
                }

                // Get Advertises list
                var advertises = advertisesGetRes.body;

                // Set assertions
                (advertises[0].user._id).should.equal(userId);
                (advertises[0].name).should.match('Advertise name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Advertise if not logged in', function (done) {
    agent.post('/api/advertises')
      .send(advertise)
      .expect(403)
      .end(function (advertiseSaveErr, advertiseSaveRes) {
        // Call the assertion callback
        done(advertiseSaveErr);
      });
  });

  it('should not be able to save an Advertise if no name is provided', function (done) {
    // Invalidate name field
    advertise.name = '';

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

        // Save a new Advertise
        agent.post('/api/advertises')
          .send(advertise)
          .expect(400)
          .end(function (advertiseSaveErr, advertiseSaveRes) {
            // Set message assertion
            (advertiseSaveRes.body.message).should.match('Please fill Advertise name');

            // Handle Advertise save error
            done(advertiseSaveErr);
          });
      });
  });

  it('should be able to update an Advertise if signed in', function (done) {
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

        // Save a new Advertise
        agent.post('/api/advertises')
          .send(advertise)
          .expect(200)
          .end(function (advertiseSaveErr, advertiseSaveRes) {
            // Handle Advertise save error
            if (advertiseSaveErr) {
              return done(advertiseSaveErr);
            }

            // Update Advertise name
            advertise.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Advertise
            agent.put('/api/advertises/' + advertiseSaveRes.body._id)
              .send(advertise)
              .expect(200)
              .end(function (advertiseUpdateErr, advertiseUpdateRes) {
                // Handle Advertise update error
                if (advertiseUpdateErr) {
                  return done(advertiseUpdateErr);
                }

                // Set assertions
                (advertiseUpdateRes.body._id).should.equal(advertiseSaveRes.body._id);
                (advertiseUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Advertises if not signed in', function (done) {
    // Create new Advertise model instance
    var advertiseObj = new Advertise(advertise);

    // Save the advertise
    advertiseObj.save(function () {
      // Request Advertises
      request(app).get('/api/advertises')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Advertise if not signed in', function (done) {
    // Create new Advertise model instance
    var advertiseObj = new Advertise(advertise);

    // Save the Advertise
    advertiseObj.save(function () {
      request(app).get('/api/advertises/' + advertiseObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', advertise.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Advertise with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/advertises/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Advertise is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Advertise which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Advertise
    request(app).get('/api/advertises/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Advertise with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Advertise if signed in', function (done) {
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

        // Save a new Advertise
        agent.post('/api/advertises')
          .send(advertise)
          .expect(200)
          .end(function (advertiseSaveErr, advertiseSaveRes) {
            // Handle Advertise save error
            if (advertiseSaveErr) {
              return done(advertiseSaveErr);
            }

            // Delete an existing Advertise
            agent.delete('/api/advertises/' + advertiseSaveRes.body._id)
              .send(advertise)
              .expect(200)
              .end(function (advertiseDeleteErr, advertiseDeleteRes) {
                // Handle advertise error error
                if (advertiseDeleteErr) {
                  return done(advertiseDeleteErr);
                }

                // Set assertions
                (advertiseDeleteRes.body._id).should.equal(advertiseSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Advertise if not signed in', function (done) {
    // Set Advertise user
    advertise.user = user;

    // Create new Advertise model instance
    var advertiseObj = new Advertise(advertise);

    // Save the Advertise
    advertiseObj.save(function () {
      // Try deleting Advertise
      request(app).delete('/api/advertises/' + advertiseObj._id)
        .expect(403)
        .end(function (advertiseDeleteErr, advertiseDeleteRes) {
          // Set message assertion
          (advertiseDeleteRes.body.message).should.match('User is not authorized');

          // Handle Advertise error error
          done(advertiseDeleteErr);
        });

    });
  });

  it('should be able to get a single Advertise that has an orphaned user reference', function (done) {
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

          // Save a new Advertise
          agent.post('/api/advertises')
            .send(advertise)
            .expect(200)
            .end(function (advertiseSaveErr, advertiseSaveRes) {
              // Handle Advertise save error
              if (advertiseSaveErr) {
                return done(advertiseSaveErr);
              }

              // Set assertions on new Advertise
              (advertiseSaveRes.body.name).should.equal(advertise.name);
              should.exist(advertiseSaveRes.body.user);
              should.equal(advertiseSaveRes.body.user._id, orphanId);

              // force the Advertise to have an orphaned user reference
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

                    // Get the Advertise
                    agent.get('/api/advertises/' + advertiseSaveRes.body._id)
                      .expect(200)
                      .end(function (advertiseInfoErr, advertiseInfoRes) {
                        // Handle Advertise error
                        if (advertiseInfoErr) {
                          return done(advertiseInfoErr);
                        }

                        // Set assertions
                        (advertiseInfoRes.body._id).should.equal(advertiseSaveRes.body._id);
                        (advertiseInfoRes.body.name).should.equal(advertise.name);
                        should.equal(advertiseInfoRes.body.user, undefined);

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
      Advertise.remove().exec(done);
    });
  });
});

'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Ratesuk = mongoose.model('Ratesuk'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  ratesuk;

/**
 * Ratesuk routes tests
 */
describe('Ratesuk CRUD tests', function () {

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

    // Save a user to the test db and create new Ratesuk
    user.save(function () {
      ratesuk = {
        name: 'Ratesuk name'
      };

      done();
    });
  });

  it('should be able to save a Ratesuk if logged in', function (done) {
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

        // Save a new Ratesuk
        agent.post('/api/ratesuks')
          .send(ratesuk)
          .expect(200)
          .end(function (ratesukSaveErr, ratesukSaveRes) {
            // Handle Ratesuk save error
            if (ratesukSaveErr) {
              return done(ratesukSaveErr);
            }

            // Get a list of Ratesuks
            agent.get('/api/ratesuks')
              .end(function (ratesuksGetErr, ratesuksGetRes) {
                // Handle Ratesuks save error
                if (ratesuksGetErr) {
                  return done(ratesuksGetErr);
                }

                // Get Ratesuks list
                var ratesuks = ratesuksGetRes.body;

                // Set assertions
                (ratesuks[0].user._id).should.equal(userId);
                (ratesuks[0].name).should.match('Ratesuk name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Ratesuk if not logged in', function (done) {
    agent.post('/api/ratesuks')
      .send(ratesuk)
      .expect(403)
      .end(function (ratesukSaveErr, ratesukSaveRes) {
        // Call the assertion callback
        done(ratesukSaveErr);
      });
  });

  it('should not be able to save an Ratesuk if no name is provided', function (done) {
    // Invalidate name field
    ratesuk.name = '';

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

        // Save a new Ratesuk
        agent.post('/api/ratesuks')
          .send(ratesuk)
          .expect(400)
          .end(function (ratesukSaveErr, ratesukSaveRes) {
            // Set message assertion
            (ratesukSaveRes.body.message).should.match('Please fill Ratesuk name');

            // Handle Ratesuk save error
            done(ratesukSaveErr);
          });
      });
  });

  it('should be able to update an Ratesuk if signed in', function (done) {
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

        // Save a new Ratesuk
        agent.post('/api/ratesuks')
          .send(ratesuk)
          .expect(200)
          .end(function (ratesukSaveErr, ratesukSaveRes) {
            // Handle Ratesuk save error
            if (ratesukSaveErr) {
              return done(ratesukSaveErr);
            }

            // Update Ratesuk name
            ratesuk.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Ratesuk
            agent.put('/api/ratesuks/' + ratesukSaveRes.body._id)
              .send(ratesuk)
              .expect(200)
              .end(function (ratesukUpdateErr, ratesukUpdateRes) {
                // Handle Ratesuk update error
                if (ratesukUpdateErr) {
                  return done(ratesukUpdateErr);
                }

                // Set assertions
                (ratesukUpdateRes.body._id).should.equal(ratesukSaveRes.body._id);
                (ratesukUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Ratesuks if not signed in', function (done) {
    // Create new Ratesuk model instance
    var ratesukObj = new Ratesuk(ratesuk);

    // Save the ratesuk
    ratesukObj.save(function () {
      // Request Ratesuks
      request(app).get('/api/ratesuks')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Ratesuk if not signed in', function (done) {
    // Create new Ratesuk model instance
    var ratesukObj = new Ratesuk(ratesuk);

    // Save the Ratesuk
    ratesukObj.save(function () {
      request(app).get('/api/ratesuks/' + ratesukObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', ratesuk.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Ratesuk with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/ratesuks/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Ratesuk is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Ratesuk which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Ratesuk
    request(app).get('/api/ratesuks/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Ratesuk with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Ratesuk if signed in', function (done) {
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

        // Save a new Ratesuk
        agent.post('/api/ratesuks')
          .send(ratesuk)
          .expect(200)
          .end(function (ratesukSaveErr, ratesukSaveRes) {
            // Handle Ratesuk save error
            if (ratesukSaveErr) {
              return done(ratesukSaveErr);
            }

            // Delete an existing Ratesuk
            agent.delete('/api/ratesuks/' + ratesukSaveRes.body._id)
              .send(ratesuk)
              .expect(200)
              .end(function (ratesukDeleteErr, ratesukDeleteRes) {
                // Handle ratesuk error error
                if (ratesukDeleteErr) {
                  return done(ratesukDeleteErr);
                }

                // Set assertions
                (ratesukDeleteRes.body._id).should.equal(ratesukSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Ratesuk if not signed in', function (done) {
    // Set Ratesuk user
    ratesuk.user = user;

    // Create new Ratesuk model instance
    var ratesukObj = new Ratesuk(ratesuk);

    // Save the Ratesuk
    ratesukObj.save(function () {
      // Try deleting Ratesuk
      request(app).delete('/api/ratesuks/' + ratesukObj._id)
        .expect(403)
        .end(function (ratesukDeleteErr, ratesukDeleteRes) {
          // Set message assertion
          (ratesukDeleteRes.body.message).should.match('User is not authorized');

          // Handle Ratesuk error error
          done(ratesukDeleteErr);
        });

    });
  });

  it('should be able to get a single Ratesuk that has an orphaned user reference', function (done) {
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

          // Save a new Ratesuk
          agent.post('/api/ratesuks')
            .send(ratesuk)
            .expect(200)
            .end(function (ratesukSaveErr, ratesukSaveRes) {
              // Handle Ratesuk save error
              if (ratesukSaveErr) {
                return done(ratesukSaveErr);
              }

              // Set assertions on new Ratesuk
              (ratesukSaveRes.body.name).should.equal(ratesuk.name);
              should.exist(ratesukSaveRes.body.user);
              should.equal(ratesukSaveRes.body.user._id, orphanId);

              // force the Ratesuk to have an orphaned user reference
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

                    // Get the Ratesuk
                    agent.get('/api/ratesuks/' + ratesukSaveRes.body._id)
                      .expect(200)
                      .end(function (ratesukInfoErr, ratesukInfoRes) {
                        // Handle Ratesuk error
                        if (ratesukInfoErr) {
                          return done(ratesukInfoErr);
                        }

                        // Set assertions
                        (ratesukInfoRes.body._id).should.equal(ratesukSaveRes.body._id);
                        (ratesukInfoRes.body.name).should.equal(ratesuk.name);
                        should.equal(ratesukInfoRes.body.user, undefined);

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
      Ratesuk.remove().exec(done);
    });
  });
});

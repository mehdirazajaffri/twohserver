'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Rate = mongoose.model('Rate'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  rate;

/**
 * Rate routes tests
 */
describe('Rate CRUD tests', function () {

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

    // Save a user to the test db and create new Rate
    user.save(function () {
      rate = {
        name: 'Rate name'
      };

      done();
    });
  });

  it('should be able to save a Rate if logged in', function (done) {
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

        // Save a new Rate
        agent.post('/api/rates')
          .send(rate)
          .expect(200)
          .end(function (rateSaveErr, rateSaveRes) {
            // Handle Rate save error
            if (rateSaveErr) {
              return done(rateSaveErr);
            }

            // Get a list of Rates
            agent.get('/api/rates')
              .end(function (ratesGetErr, ratesGetRes) {
                // Handle Rates save error
                if (ratesGetErr) {
                  return done(ratesGetErr);
                }

                // Get Rates list
                var rates = ratesGetRes.body;

                // Set assertions
                (rates[0].user._id).should.equal(userId);
                (rates[0].name).should.match('Rate name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Rate if not logged in', function (done) {
    agent.post('/api/rates')
      .send(rate)
      .expect(403)
      .end(function (rateSaveErr, rateSaveRes) {
        // Call the assertion callback
        done(rateSaveErr);
      });
  });

  it('should not be able to save an Rate if no name is provided', function (done) {
    // Invalidate name field
    rate.name = '';

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

        // Save a new Rate
        agent.post('/api/rates')
          .send(rate)
          .expect(400)
          .end(function (rateSaveErr, rateSaveRes) {
            // Set message assertion
            (rateSaveRes.body.message).should.match('Please fill Rate name');

            // Handle Rate save error
            done(rateSaveErr);
          });
      });
  });

  it('should be able to update an Rate if signed in', function (done) {
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

        // Save a new Rate
        agent.post('/api/rates')
          .send(rate)
          .expect(200)
          .end(function (rateSaveErr, rateSaveRes) {
            // Handle Rate save error
            if (rateSaveErr) {
              return done(rateSaveErr);
            }

            // Update Rate name
            rate.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Rate
            agent.put('/api/rates/' + rateSaveRes.body._id)
              .send(rate)
              .expect(200)
              .end(function (rateUpdateErr, rateUpdateRes) {
                // Handle Rate update error
                if (rateUpdateErr) {
                  return done(rateUpdateErr);
                }

                // Set assertions
                (rateUpdateRes.body._id).should.equal(rateSaveRes.body._id);
                (rateUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Rates if not signed in', function (done) {
    // Create new Rate model instance
    var rateObj = new Rate(rate);

    // Save the rate
    rateObj.save(function () {
      // Request Rates
      request(app).get('/api/rates')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Rate if not signed in', function (done) {
    // Create new Rate model instance
    var rateObj = new Rate(rate);

    // Save the Rate
    rateObj.save(function () {
      request(app).get('/api/rates/' + rateObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', rate.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Rate with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/rates/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Rate is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Rate which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Rate
    request(app).get('/api/rates/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Rate with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Rate if signed in', function (done) {
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

        // Save a new Rate
        agent.post('/api/rates')
          .send(rate)
          .expect(200)
          .end(function (rateSaveErr, rateSaveRes) {
            // Handle Rate save error
            if (rateSaveErr) {
              return done(rateSaveErr);
            }

            // Delete an existing Rate
            agent.delete('/api/rates/' + rateSaveRes.body._id)
              .send(rate)
              .expect(200)
              .end(function (rateDeleteErr, rateDeleteRes) {
                // Handle rate error error
                if (rateDeleteErr) {
                  return done(rateDeleteErr);
                }

                // Set assertions
                (rateDeleteRes.body._id).should.equal(rateSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Rate if not signed in', function (done) {
    // Set Rate user
    rate.user = user;

    // Create new Rate model instance
    var rateObj = new Rate(rate);

    // Save the Rate
    rateObj.save(function () {
      // Try deleting Rate
      request(app).delete('/api/rates/' + rateObj._id)
        .expect(403)
        .end(function (rateDeleteErr, rateDeleteRes) {
          // Set message assertion
          (rateDeleteRes.body.message).should.match('User is not authorized');

          // Handle Rate error error
          done(rateDeleteErr);
        });

    });
  });

  it('should be able to get a single Rate that has an orphaned user reference', function (done) {
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

          // Save a new Rate
          agent.post('/api/rates')
            .send(rate)
            .expect(200)
            .end(function (rateSaveErr, rateSaveRes) {
              // Handle Rate save error
              if (rateSaveErr) {
                return done(rateSaveErr);
              }

              // Set assertions on new Rate
              (rateSaveRes.body.name).should.equal(rate.name);
              should.exist(rateSaveRes.body.user);
              should.equal(rateSaveRes.body.user._id, orphanId);

              // force the Rate to have an orphaned user reference
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

                    // Get the Rate
                    agent.get('/api/rates/' + rateSaveRes.body._id)
                      .expect(200)
                      .end(function (rateInfoErr, rateInfoRes) {
                        // Handle Rate error
                        if (rateInfoErr) {
                          return done(rateInfoErr);
                        }

                        // Set assertions
                        (rateInfoRes.body._id).should.equal(rateSaveRes.body._id);
                        (rateInfoRes.body.name).should.equal(rate.name);
                        should.equal(rateInfoRes.body.user, undefined);

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
      Rate.remove().exec(done);
    });
  });
});

'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  ShippingukCharge = mongoose.model('ShippingukCharge'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  shippingukCharge;

/**
 * Shippinguk charge routes tests
 */
describe('Shippinguk charge CRUD tests', function () {

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

    // Save a user to the test db and create new Shippinguk charge
    user.save(function () {
      shippingukCharge = {
        name: 'Shippinguk charge name'
      };

      done();
    });
  });

  it('should be able to save a Shippinguk charge if logged in', function (done) {
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

        // Save a new Shippinguk charge
        agent.post('/api/shippingukCharges')
          .send(shippingukCharge)
          .expect(200)
          .end(function (shippingukChargeSaveErr, shippingukChargeSaveRes) {
            // Handle Shippinguk charge save error
            if (shippingukChargeSaveErr) {
              return done(shippingukChargeSaveErr);
            }

            // Get a list of Shippinguk charges
            agent.get('/api/shippingukCharges')
              .end(function (shippingukChargesGetErr, shippingukChargesGetRes) {
                // Handle Shippinguk charges save error
                if (shippingukChargesGetErr) {
                  return done(shippingukChargesGetErr);
                }

                // Get Shippinguk charges list
                var shippingukCharges = shippingukChargesGetRes.body;

                // Set assertions
                (shippingukCharges[0].user._id).should.equal(userId);
                (shippingukCharges[0].name).should.match('Shippinguk charge name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Shippinguk charge if not logged in', function (done) {
    agent.post('/api/shippingukCharges')
      .send(shippingukCharge)
      .expect(403)
      .end(function (shippingukChargeSaveErr, shippingukChargeSaveRes) {
        // Call the assertion callback
        done(shippingukChargeSaveErr);
      });
  });

  it('should not be able to save an Shippinguk charge if no name is provided', function (done) {
    // Invalidate name field
    shippingukCharge.name = '';

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

        // Save a new Shippinguk charge
        agent.post('/api/shippingukCharges')
          .send(shippingukCharge)
          .expect(400)
          .end(function (shippingukChargeSaveErr, shippingukChargeSaveRes) {
            // Set message assertion
            (shippingukChargeSaveRes.body.message).should.match('Please fill Shippinguk charge name');

            // Handle Shippinguk charge save error
            done(shippingukChargeSaveErr);
          });
      });
  });

  it('should be able to update an Shippinguk charge if signed in', function (done) {
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

        // Save a new Shippinguk charge
        agent.post('/api/shippingukCharges')
          .send(shippingukCharge)
          .expect(200)
          .end(function (shippingukChargeSaveErr, shippingukChargeSaveRes) {
            // Handle Shippinguk charge save error
            if (shippingukChargeSaveErr) {
              return done(shippingukChargeSaveErr);
            }

            // Update Shippinguk charge name
            shippingukCharge.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Shippinguk charge
            agent.put('/api/shippingukCharges/' + shippingukChargeSaveRes.body._id)
              .send(shippingukCharge)
              .expect(200)
              .end(function (shippingukChargeUpdateErr, shippingukChargeUpdateRes) {
                // Handle Shippinguk charge update error
                if (shippingukChargeUpdateErr) {
                  return done(shippingukChargeUpdateErr);
                }

                // Set assertions
                (shippingukChargeUpdateRes.body._id).should.equal(shippingukChargeSaveRes.body._id);
                (shippingukChargeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Shippinguk charges if not signed in', function (done) {
    // Create new Shippinguk charge model instance
    var shippingukChargeObj = new ShippingukCharge(shippingukCharge);

    // Save the shippingukCharge
    shippingukChargeObj.save(function () {
      // Request Shippinguk charges
      request(app).get('/api/shippingukCharges')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Shippinguk charge if not signed in', function (done) {
    // Create new Shippinguk charge model instance
    var shippingukChargeObj = new ShippingukCharge(shippingukCharge);

    // Save the Shippinguk charge
    shippingukChargeObj.save(function () {
      request(app).get('/api/shippingukCharges/' + shippingukChargeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', shippingukCharge.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Shippinguk charge with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/shippingukCharges/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Shippinguk charge is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Shippinguk charge which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Shippinguk charge
    request(app).get('/api/shippingukCharges/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Shippinguk charge with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Shippinguk charge if signed in', function (done) {
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

        // Save a new Shippinguk charge
        agent.post('/api/shippingukCharges')
          .send(shippingukCharge)
          .expect(200)
          .end(function (shippingukChargeSaveErr, shippingukChargeSaveRes) {
            // Handle Shippinguk charge save error
            if (shippingukChargeSaveErr) {
              return done(shippingukChargeSaveErr);
            }

            // Delete an existing Shippinguk charge
            agent.delete('/api/shippingukCharges/' + shippingukChargeSaveRes.body._id)
              .send(shippingukCharge)
              .expect(200)
              .end(function (shippingukChargeDeleteErr, shippingukChargeDeleteRes) {
                // Handle shippingukCharge error error
                if (shippingukChargeDeleteErr) {
                  return done(shippingukChargeDeleteErr);
                }

                // Set assertions
                (shippingukChargeDeleteRes.body._id).should.equal(shippingukChargeSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Shippinguk charge if not signed in', function (done) {
    // Set Shippinguk charge user
    shippingukCharge.user = user;

    // Create new Shippinguk charge model instance
    var shippingukChargeObj = new ShippingukCharge(shippingukCharge);

    // Save the Shippinguk charge
    shippingukChargeObj.save(function () {
      // Try deleting Shippinguk charge
      request(app).delete('/api/shippingukCharges/' + shippingukChargeObj._id)
        .expect(403)
        .end(function (shippingukChargeDeleteErr, shippingukChargeDeleteRes) {
          // Set message assertion
          (shippingukChargeDeleteRes.body.message).should.match('User is not authorized');

          // Handle Shippinguk charge error error
          done(shippingukChargeDeleteErr);
        });

    });
  });

  it('should be able to get a single Shippinguk charge that has an orphaned user reference', function (done) {
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

          // Save a new Shippinguk charge
          agent.post('/api/shippingukCharges')
            .send(shippingukCharge)
            .expect(200)
            .end(function (shippingukChargeSaveErr, shippingukChargeSaveRes) {
              // Handle Shippinguk charge save error
              if (shippingukChargeSaveErr) {
                return done(shippingukChargeSaveErr);
              }

              // Set assertions on new Shippinguk charge
              (shippingukChargeSaveRes.body.name).should.equal(shippingukCharge.name);
              should.exist(shippingukChargeSaveRes.body.user);
              should.equal(shippingukChargeSaveRes.body.user._id, orphanId);

              // force the Shippinguk charge to have an orphaned user reference
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

                    // Get the Shippinguk charge
                    agent.get('/api/shippingukCharges/' + shippingukChargeSaveRes.body._id)
                      .expect(200)
                      .end(function (shippingukChargeInfoErr, shippingukChargeInfoRes) {
                        // Handle Shippinguk charge error
                        if (shippingukChargeInfoErr) {
                          return done(shippingukChargeInfoErr);
                        }

                        // Set assertions
                        (shippingukChargeInfoRes.body._id).should.equal(shippingukChargeSaveRes.body._id);
                        (shippingukChargeInfoRes.body.name).should.equal(shippingukCharge.name);
                        should.equal(shippingukChargeInfoRes.body.user, undefined);

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
      ShippingukCharge.remove().exec(done);
    });
  });
});

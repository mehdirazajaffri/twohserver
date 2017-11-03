'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  ShippingCharge = mongoose.model('ShippingCharge'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  shippingCharge;

/**
 * Shipping charge routes tests
 */
describe('Shipping charge CRUD tests', function () {

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

    // Save a user to the test db and create new Shipping charge
    user.save(function () {
      shippingCharge = {
        name: 'Shipping charge name'
      };

      done();
    });
  });

  it('should be able to save a Shipping charge if logged in', function (done) {
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

        // Save a new Shipping charge
        agent.post('/api/shippingCharges')
          .send(shippingCharge)
          .expect(200)
          .end(function (shippingChargeSaveErr, shippingChargeSaveRes) {
            // Handle Shipping charge save error
            if (shippingChargeSaveErr) {
              return done(shippingChargeSaveErr);
            }

            // Get a list of Shipping charges
            agent.get('/api/shippingCharges')
              .end(function (shippingChargesGetErr, shippingChargesGetRes) {
                // Handle Shipping charges save error
                if (shippingChargesGetErr) {
                  return done(shippingChargesGetErr);
                }

                // Get Shipping charges list
                var shippingCharges = shippingChargesGetRes.body;

                // Set assertions
                (shippingCharges[0].user._id).should.equal(userId);
                (shippingCharges[0].name).should.match('Shipping charge name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Shipping charge if not logged in', function (done) {
    agent.post('/api/shippingCharges')
      .send(shippingCharge)
      .expect(403)
      .end(function (shippingChargeSaveErr, shippingChargeSaveRes) {
        // Call the assertion callback
        done(shippingChargeSaveErr);
      });
  });

  it('should not be able to save an Shipping charge if no name is provided', function (done) {
    // Invalidate name field
    shippingCharge.name = '';

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

        // Save a new Shipping charge
        agent.post('/api/shippingCharges')
          .send(shippingCharge)
          .expect(400)
          .end(function (shippingChargeSaveErr, shippingChargeSaveRes) {
            // Set message assertion
            (shippingChargeSaveRes.body.message).should.match('Please fill Shipping charge name');

            // Handle Shipping charge save error
            done(shippingChargeSaveErr);
          });
      });
  });

  it('should be able to update an Shipping charge if signed in', function (done) {
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

        // Save a new Shipping charge
        agent.post('/api/shippingCharges')
          .send(shippingCharge)
          .expect(200)
          .end(function (shippingChargeSaveErr, shippingChargeSaveRes) {
            // Handle Shipping charge save error
            if (shippingChargeSaveErr) {
              return done(shippingChargeSaveErr);
            }

            // Update Shipping charge name
            shippingCharge.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Shipping charge
            agent.put('/api/shippingCharges/' + shippingChargeSaveRes.body._id)
              .send(shippingCharge)
              .expect(200)
              .end(function (shippingChargeUpdateErr, shippingChargeUpdateRes) {
                // Handle Shipping charge update error
                if (shippingChargeUpdateErr) {
                  return done(shippingChargeUpdateErr);
                }

                // Set assertions
                (shippingChargeUpdateRes.body._id).should.equal(shippingChargeSaveRes.body._id);
                (shippingChargeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Shipping charges if not signed in', function (done) {
    // Create new Shipping charge model instance
    var shippingChargeObj = new ShippingCharge(shippingCharge);

    // Save the shippingCharge
    shippingChargeObj.save(function () {
      // Request Shipping charges
      request(app).get('/api/shippingCharges')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Shipping charge if not signed in', function (done) {
    // Create new Shipping charge model instance
    var shippingChargeObj = new ShippingCharge(shippingCharge);

    // Save the Shipping charge
    shippingChargeObj.save(function () {
      request(app).get('/api/shippingCharges/' + shippingChargeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', shippingCharge.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Shipping charge with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/shippingCharges/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Shipping charge is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Shipping charge which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Shipping charge
    request(app).get('/api/shippingCharges/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Shipping charge with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Shipping charge if signed in', function (done) {
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

        // Save a new Shipping charge
        agent.post('/api/shippingCharges')
          .send(shippingCharge)
          .expect(200)
          .end(function (shippingChargeSaveErr, shippingChargeSaveRes) {
            // Handle Shipping charge save error
            if (shippingChargeSaveErr) {
              return done(shippingChargeSaveErr);
            }

            // Delete an existing Shipping charge
            agent.delete('/api/shippingCharges/' + shippingChargeSaveRes.body._id)
              .send(shippingCharge)
              .expect(200)
              .end(function (shippingChargeDeleteErr, shippingChargeDeleteRes) {
                // Handle shippingCharge error error
                if (shippingChargeDeleteErr) {
                  return done(shippingChargeDeleteErr);
                }

                // Set assertions
                (shippingChargeDeleteRes.body._id).should.equal(shippingChargeSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Shipping charge if not signed in', function (done) {
    // Set Shipping charge user
    shippingCharge.user = user;

    // Create new Shipping charge model instance
    var shippingChargeObj = new ShippingCharge(shippingCharge);

    // Save the Shipping charge
    shippingChargeObj.save(function () {
      // Try deleting Shipping charge
      request(app).delete('/api/shippingCharges/' + shippingChargeObj._id)
        .expect(403)
        .end(function (shippingChargeDeleteErr, shippingChargeDeleteRes) {
          // Set message assertion
          (shippingChargeDeleteRes.body.message).should.match('User is not authorized');

          // Handle Shipping charge error error
          done(shippingChargeDeleteErr);
        });

    });
  });

  it('should be able to get a single Shipping charge that has an orphaned user reference', function (done) {
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

          // Save a new Shipping charge
          agent.post('/api/shippingCharges')
            .send(shippingCharge)
            .expect(200)
            .end(function (shippingChargeSaveErr, shippingChargeSaveRes) {
              // Handle Shipping charge save error
              if (shippingChargeSaveErr) {
                return done(shippingChargeSaveErr);
              }

              // Set assertions on new Shipping charge
              (shippingChargeSaveRes.body.name).should.equal(shippingCharge.name);
              should.exist(shippingChargeSaveRes.body.user);
              should.equal(shippingChargeSaveRes.body.user._id, orphanId);

              // force the Shipping charge to have an orphaned user reference
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

                    // Get the Shipping charge
                    agent.get('/api/shippingCharges/' + shippingChargeSaveRes.body._id)
                      .expect(200)
                      .end(function (shippingChargeInfoErr, shippingChargeInfoRes) {
                        // Handle Shipping charge error
                        if (shippingChargeInfoErr) {
                          return done(shippingChargeInfoErr);
                        }

                        // Set assertions
                        (shippingChargeInfoRes.body._id).should.equal(shippingChargeSaveRes.body._id);
                        (shippingChargeInfoRes.body.name).should.equal(shippingCharge.name);
                        should.equal(shippingChargeInfoRes.body.user, undefined);

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
      ShippingCharge.remove().exec(done);
    });
  });
});

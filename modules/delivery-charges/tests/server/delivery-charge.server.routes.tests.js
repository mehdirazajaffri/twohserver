'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  DeliveryCharge = mongoose.model('DeliveryCharge'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  deliveryCharge;

/**
 * Delivery charge routes tests
 */
describe('Delivery charge CRUD tests', function () {

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

    // Save a user to the test db and create new Delivery charge
    user.save(function () {
      deliveryCharge = {
        name: 'Delivery charge name'
      };

      done();
    });
  });

  it('should be able to save a Delivery charge if logged in', function (done) {
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

        // Save a new Delivery charge
        agent.post('/api/deliveryCharges')
          .send(deliveryCharge)
          .expect(200)
          .end(function (deliveryChargeSaveErr, deliveryChargeSaveRes) {
            // Handle Delivery charge save error
            if (deliveryChargeSaveErr) {
              return done(deliveryChargeSaveErr);
            }

            // Get a list of Delivery charges
            agent.get('/api/deliveryCharges')
              .end(function (deliveryChargesGetErr, deliveryChargesGetRes) {
                // Handle Delivery charges save error
                if (deliveryChargesGetErr) {
                  return done(deliveryChargesGetErr);
                }

                // Get Delivery charges list
                var deliveryCharges = deliveryChargesGetRes.body;

                // Set assertions
                (deliveryCharges[0].user._id).should.equal(userId);
                (deliveryCharges[0].name).should.match('Delivery charge name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Delivery charge if not logged in', function (done) {
    agent.post('/api/deliveryCharges')
      .send(deliveryCharge)
      .expect(403)
      .end(function (deliveryChargeSaveErr, deliveryChargeSaveRes) {
        // Call the assertion callback
        done(deliveryChargeSaveErr);
      });
  });

  it('should not be able to save an Delivery charge if no name is provided', function (done) {
    // Invalidate name field
    deliveryCharge.name = '';

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

        // Save a new Delivery charge
        agent.post('/api/deliveryCharges')
          .send(deliveryCharge)
          .expect(400)
          .end(function (deliveryChargeSaveErr, deliveryChargeSaveRes) {
            // Set message assertion
            (deliveryChargeSaveRes.body.message).should.match('Please fill Delivery charge name');

            // Handle Delivery charge save error
            done(deliveryChargeSaveErr);
          });
      });
  });

  it('should be able to update an Delivery charge if signed in', function (done) {
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

        // Save a new Delivery charge
        agent.post('/api/deliveryCharges')
          .send(deliveryCharge)
          .expect(200)
          .end(function (deliveryChargeSaveErr, deliveryChargeSaveRes) {
            // Handle Delivery charge save error
            if (deliveryChargeSaveErr) {
              return done(deliveryChargeSaveErr);
            }

            // Update Delivery charge name
            deliveryCharge.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Delivery charge
            agent.put('/api/deliveryCharges/' + deliveryChargeSaveRes.body._id)
              .send(deliveryCharge)
              .expect(200)
              .end(function (deliveryChargeUpdateErr, deliveryChargeUpdateRes) {
                // Handle Delivery charge update error
                if (deliveryChargeUpdateErr) {
                  return done(deliveryChargeUpdateErr);
                }

                // Set assertions
                (deliveryChargeUpdateRes.body._id).should.equal(deliveryChargeSaveRes.body._id);
                (deliveryChargeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Delivery charges if not signed in', function (done) {
    // Create new Delivery charge model instance
    var deliveryChargeObj = new DeliveryCharge(deliveryCharge);

    // Save the deliveryCharge
    deliveryChargeObj.save(function () {
      // Request Delivery charges
      request(app).get('/api/deliveryCharges')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Delivery charge if not signed in', function (done) {
    // Create new Delivery charge model instance
    var deliveryChargeObj = new DeliveryCharge(deliveryCharge);

    // Save the Delivery charge
    deliveryChargeObj.save(function () {
      request(app).get('/api/deliveryCharges/' + deliveryChargeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', deliveryCharge.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Delivery charge with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/deliveryCharges/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Delivery charge is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Delivery charge which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Delivery charge
    request(app).get('/api/deliveryCharges/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Delivery charge with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Delivery charge if signed in', function (done) {
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

        // Save a new Delivery charge
        agent.post('/api/deliveryCharges')
          .send(deliveryCharge)
          .expect(200)
          .end(function (deliveryChargeSaveErr, deliveryChargeSaveRes) {
            // Handle Delivery charge save error
            if (deliveryChargeSaveErr) {
              return done(deliveryChargeSaveErr);
            }

            // Delete an existing Delivery charge
            agent.delete('/api/deliveryCharges/' + deliveryChargeSaveRes.body._id)
              .send(deliveryCharge)
              .expect(200)
              .end(function (deliveryChargeDeleteErr, deliveryChargeDeleteRes) {
                // Handle deliveryCharge error error
                if (deliveryChargeDeleteErr) {
                  return done(deliveryChargeDeleteErr);
                }

                // Set assertions
                (deliveryChargeDeleteRes.body._id).should.equal(deliveryChargeSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Delivery charge if not signed in', function (done) {
    // Set Delivery charge user
    deliveryCharge.user = user;

    // Create new Delivery charge model instance
    var deliveryChargeObj = new DeliveryCharge(deliveryCharge);

    // Save the Delivery charge
    deliveryChargeObj.save(function () {
      // Try deleting Delivery charge
      request(app).delete('/api/deliveryCharges/' + deliveryChargeObj._id)
        .expect(403)
        .end(function (deliveryChargeDeleteErr, deliveryChargeDeleteRes) {
          // Set message assertion
          (deliveryChargeDeleteRes.body.message).should.match('User is not authorized');

          // Handle Delivery charge error error
          done(deliveryChargeDeleteErr);
        });

    });
  });

  it('should be able to get a single Delivery charge that has an orphaned user reference', function (done) {
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

          // Save a new Delivery charge
          agent.post('/api/deliveryCharges')
            .send(deliveryCharge)
            .expect(200)
            .end(function (deliveryChargeSaveErr, deliveryChargeSaveRes) {
              // Handle Delivery charge save error
              if (deliveryChargeSaveErr) {
                return done(deliveryChargeSaveErr);
              }

              // Set assertions on new Delivery charge
              (deliveryChargeSaveRes.body.name).should.equal(deliveryCharge.name);
              should.exist(deliveryChargeSaveRes.body.user);
              should.equal(deliveryChargeSaveRes.body.user._id, orphanId);

              // force the Delivery charge to have an orphaned user reference
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

                    // Get the Delivery charge
                    agent.get('/api/deliveryCharges/' + deliveryChargeSaveRes.body._id)
                      .expect(200)
                      .end(function (deliveryChargeInfoErr, deliveryChargeInfoRes) {
                        // Handle Delivery charge error
                        if (deliveryChargeInfoErr) {
                          return done(deliveryChargeInfoErr);
                        }

                        // Set assertions
                        (deliveryChargeInfoRes.body._id).should.equal(deliveryChargeSaveRes.body._id);
                        (deliveryChargeInfoRes.body.name).should.equal(deliveryCharge.name);
                        should.equal(deliveryChargeInfoRes.body.user, undefined);

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
      DeliveryCharge.remove().exec(done);
    });
  });
});

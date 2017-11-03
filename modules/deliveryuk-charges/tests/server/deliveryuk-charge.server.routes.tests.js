'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  DeliveryukCharge = mongoose.model('DeliveryukCharge'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  deliveryukCharge;

/**
 * Deliveryuk charge routes tests
 */
describe('Deliveryuk charge CRUD tests', function () {

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

    // Save a user to the test db and create new Deliveryuk charge
    user.save(function () {
      deliveryukCharge = {
        name: 'Deliveryuk charge name'
      };

      done();
    });
  });

  it('should be able to save a Deliveryuk charge if logged in', function (done) {
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

        // Save a new Deliveryuk charge
        agent.post('/api/deliveryukCharges')
          .send(deliveryukCharge)
          .expect(200)
          .end(function (deliveryukChargeSaveErr, deliveryukChargeSaveRes) {
            // Handle Deliveryuk charge save error
            if (deliveryukChargeSaveErr) {
              return done(deliveryukChargeSaveErr);
            }

            // Get a list of Deliveryuk charges
            agent.get('/api/deliveryukCharges')
              .end(function (deliveryukChargesGetErr, deliveryukChargesGetRes) {
                // Handle Deliveryuk charges save error
                if (deliveryukChargesGetErr) {
                  return done(deliveryukChargesGetErr);
                }

                // Get Deliveryuk charges list
                var deliveryukCharges = deliveryukChargesGetRes.body;

                // Set assertions
                (deliveryukCharges[0].user._id).should.equal(userId);
                (deliveryukCharges[0].name).should.match('Deliveryuk charge name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Deliveryuk charge if not logged in', function (done) {
    agent.post('/api/deliveryukCharges')
      .send(deliveryukCharge)
      .expect(403)
      .end(function (deliveryukChargeSaveErr, deliveryukChargeSaveRes) {
        // Call the assertion callback
        done(deliveryukChargeSaveErr);
      });
  });

  it('should not be able to save an Deliveryuk charge if no name is provided', function (done) {
    // Invalidate name field
    deliveryukCharge.name = '';

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

        // Save a new Deliveryuk charge
        agent.post('/api/deliveryukCharges')
          .send(deliveryukCharge)
          .expect(400)
          .end(function (deliveryukChargeSaveErr, deliveryukChargeSaveRes) {
            // Set message assertion
            (deliveryukChargeSaveRes.body.message).should.match('Please fill Deliveryuk charge name');

            // Handle Deliveryuk charge save error
            done(deliveryukChargeSaveErr);
          });
      });
  });

  it('should be able to update an Deliveryuk charge if signed in', function (done) {
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

        // Save a new Deliveryuk charge
        agent.post('/api/deliveryukCharges')
          .send(deliveryukCharge)
          .expect(200)
          .end(function (deliveryukChargeSaveErr, deliveryukChargeSaveRes) {
            // Handle Deliveryuk charge save error
            if (deliveryukChargeSaveErr) {
              return done(deliveryukChargeSaveErr);
            }

            // Update Deliveryuk charge name
            deliveryukCharge.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Deliveryuk charge
            agent.put('/api/deliveryukCharges/' + deliveryukChargeSaveRes.body._id)
              .send(deliveryukCharge)
              .expect(200)
              .end(function (deliveryukChargeUpdateErr, deliveryukChargeUpdateRes) {
                // Handle Deliveryuk charge update error
                if (deliveryukChargeUpdateErr) {
                  return done(deliveryukChargeUpdateErr);
                }

                // Set assertions
                (deliveryukChargeUpdateRes.body._id).should.equal(deliveryukChargeSaveRes.body._id);
                (deliveryukChargeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Deliveryuk charges if not signed in', function (done) {
    // Create new Deliveryuk charge model instance
    var deliveryukChargeObj = new DeliveryukCharge(deliveryukCharge);

    // Save the deliveryukCharge
    deliveryukChargeObj.save(function () {
      // Request Deliveryuk charges
      request(app).get('/api/deliveryukCharges')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Deliveryuk charge if not signed in', function (done) {
    // Create new Deliveryuk charge model instance
    var deliveryukChargeObj = new DeliveryukCharge(deliveryukCharge);

    // Save the Deliveryuk charge
    deliveryukChargeObj.save(function () {
      request(app).get('/api/deliveryukCharges/' + deliveryukChargeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', deliveryukCharge.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Deliveryuk charge with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/deliveryukCharges/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Deliveryuk charge is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Deliveryuk charge which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Deliveryuk charge
    request(app).get('/api/deliveryukCharges/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Deliveryuk charge with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Deliveryuk charge if signed in', function (done) {
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

        // Save a new Deliveryuk charge
        agent.post('/api/deliveryukCharges')
          .send(deliveryukCharge)
          .expect(200)
          .end(function (deliveryukChargeSaveErr, deliveryukChargeSaveRes) {
            // Handle Deliveryuk charge save error
            if (deliveryukChargeSaveErr) {
              return done(deliveryukChargeSaveErr);
            }

            // Delete an existing Deliveryuk charge
            agent.delete('/api/deliveryukCharges/' + deliveryukChargeSaveRes.body._id)
              .send(deliveryukCharge)
              .expect(200)
              .end(function (deliveryukChargeDeleteErr, deliveryukChargeDeleteRes) {
                // Handle deliveryukCharge error error
                if (deliveryukChargeDeleteErr) {
                  return done(deliveryukChargeDeleteErr);
                }

                // Set assertions
                (deliveryukChargeDeleteRes.body._id).should.equal(deliveryukChargeSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Deliveryuk charge if not signed in', function (done) {
    // Set Deliveryuk charge user
    deliveryukCharge.user = user;

    // Create new Deliveryuk charge model instance
    var deliveryukChargeObj = new DeliveryukCharge(deliveryukCharge);

    // Save the Deliveryuk charge
    deliveryukChargeObj.save(function () {
      // Try deleting Deliveryuk charge
      request(app).delete('/api/deliveryukCharges/' + deliveryukChargeObj._id)
        .expect(403)
        .end(function (deliveryukChargeDeleteErr, deliveryukChargeDeleteRes) {
          // Set message assertion
          (deliveryukChargeDeleteRes.body.message).should.match('User is not authorized');

          // Handle Deliveryuk charge error error
          done(deliveryukChargeDeleteErr);
        });

    });
  });

  it('should be able to get a single Deliveryuk charge that has an orphaned user reference', function (done) {
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

          // Save a new Deliveryuk charge
          agent.post('/api/deliveryukCharges')
            .send(deliveryukCharge)
            .expect(200)
            .end(function (deliveryukChargeSaveErr, deliveryukChargeSaveRes) {
              // Handle Deliveryuk charge save error
              if (deliveryukChargeSaveErr) {
                return done(deliveryukChargeSaveErr);
              }

              // Set assertions on new Deliveryuk charge
              (deliveryukChargeSaveRes.body.name).should.equal(deliveryukCharge.name);
              should.exist(deliveryukChargeSaveRes.body.user);
              should.equal(deliveryukChargeSaveRes.body.user._id, orphanId);

              // force the Deliveryuk charge to have an orphaned user reference
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

                    // Get the Deliveryuk charge
                    agent.get('/api/deliveryukCharges/' + deliveryukChargeSaveRes.body._id)
                      .expect(200)
                      .end(function (deliveryukChargeInfoErr, deliveryukChargeInfoRes) {
                        // Handle Deliveryuk charge error
                        if (deliveryukChargeInfoErr) {
                          return done(deliveryukChargeInfoErr);
                        }

                        // Set assertions
                        (deliveryukChargeInfoRes.body._id).should.equal(deliveryukChargeSaveRes.body._id);
                        (deliveryukChargeInfoRes.body.name).should.equal(deliveryukCharge.name);
                        should.equal(deliveryukChargeInfoRes.body.user, undefined);

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
      DeliveryukCharge.remove().exec(done);
    });
  });
});

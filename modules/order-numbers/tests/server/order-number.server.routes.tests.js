'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  OrderNumber = mongoose.model('OrderNumber'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  orderNumber;

/**
 * Order number routes tests
 */
describe('Order number CRUD tests', function () {

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

    // Save a user to the test db and create new Order number
    user.save(function () {
      orderNumber = {
        name: 'Order number name'
      };

      done();
    });
  });

  it('should be able to save a Order number if logged in', function (done) {
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

        // Save a new Order number
        agent.post('/api/orderNumbers')
          .send(orderNumber)
          .expect(200)
          .end(function (orderNumberSaveErr, orderNumberSaveRes) {
            // Handle Order number save error
            if (orderNumberSaveErr) {
              return done(orderNumberSaveErr);
            }

            // Get a list of Order numbers
            agent.get('/api/orderNumbers')
              .end(function (orderNumbersGetErr, orderNumbersGetRes) {
                // Handle Order numbers save error
                if (orderNumbersGetErr) {
                  return done(orderNumbersGetErr);
                }

                // Get Order numbers list
                var orderNumbers = orderNumbersGetRes.body;

                // Set assertions
                (orderNumbers[0].user._id).should.equal(userId);
                (orderNumbers[0].name).should.match('Order number name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Order number if not logged in', function (done) {
    agent.post('/api/orderNumbers')
      .send(orderNumber)
      .expect(403)
      .end(function (orderNumberSaveErr, orderNumberSaveRes) {
        // Call the assertion callback
        done(orderNumberSaveErr);
      });
  });

  it('should not be able to save an Order number if no name is provided', function (done) {
    // Invalidate name field
    orderNumber.name = '';

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

        // Save a new Order number
        agent.post('/api/orderNumbers')
          .send(orderNumber)
          .expect(400)
          .end(function (orderNumberSaveErr, orderNumberSaveRes) {
            // Set message assertion
            (orderNumberSaveRes.body.message).should.match('Please fill Order number name');

            // Handle Order number save error
            done(orderNumberSaveErr);
          });
      });
  });

  it('should be able to update an Order number if signed in', function (done) {
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

        // Save a new Order number
        agent.post('/api/orderNumbers')
          .send(orderNumber)
          .expect(200)
          .end(function (orderNumberSaveErr, orderNumberSaveRes) {
            // Handle Order number save error
            if (orderNumberSaveErr) {
              return done(orderNumberSaveErr);
            }

            // Update Order number name
            orderNumber.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Order number
            agent.put('/api/orderNumbers/' + orderNumberSaveRes.body._id)
              .send(orderNumber)
              .expect(200)
              .end(function (orderNumberUpdateErr, orderNumberUpdateRes) {
                // Handle Order number update error
                if (orderNumberUpdateErr) {
                  return done(orderNumberUpdateErr);
                }

                // Set assertions
                (orderNumberUpdateRes.body._id).should.equal(orderNumberSaveRes.body._id);
                (orderNumberUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Order numbers if not signed in', function (done) {
    // Create new Order number model instance
    var orderNumberObj = new OrderNumber(orderNumber);

    // Save the orderNumber
    orderNumberObj.save(function () {
      // Request Order numbers
      request(app).get('/api/orderNumbers')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Order number if not signed in', function (done) {
    // Create new Order number model instance
    var orderNumberObj = new OrderNumber(orderNumber);

    // Save the Order number
    orderNumberObj.save(function () {
      request(app).get('/api/orderNumbers/' + orderNumberObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', orderNumber.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Order number with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/orderNumbers/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Order number is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Order number which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Order number
    request(app).get('/api/orderNumbers/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Order number with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Order number if signed in', function (done) {
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

        // Save a new Order number
        agent.post('/api/orderNumbers')
          .send(orderNumber)
          .expect(200)
          .end(function (orderNumberSaveErr, orderNumberSaveRes) {
            // Handle Order number save error
            if (orderNumberSaveErr) {
              return done(orderNumberSaveErr);
            }

            // Delete an existing Order number
            agent.delete('/api/orderNumbers/' + orderNumberSaveRes.body._id)
              .send(orderNumber)
              .expect(200)
              .end(function (orderNumberDeleteErr, orderNumberDeleteRes) {
                // Handle orderNumber error error
                if (orderNumberDeleteErr) {
                  return done(orderNumberDeleteErr);
                }

                // Set assertions
                (orderNumberDeleteRes.body._id).should.equal(orderNumberSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Order number if not signed in', function (done) {
    // Set Order number user
    orderNumber.user = user;

    // Create new Order number model instance
    var orderNumberObj = new OrderNumber(orderNumber);

    // Save the Order number
    orderNumberObj.save(function () {
      // Try deleting Order number
      request(app).delete('/api/orderNumbers/' + orderNumberObj._id)
        .expect(403)
        .end(function (orderNumberDeleteErr, orderNumberDeleteRes) {
          // Set message assertion
          (orderNumberDeleteRes.body.message).should.match('User is not authorized');

          // Handle Order number error error
          done(orderNumberDeleteErr);
        });

    });
  });

  it('should be able to get a single Order number that has an orphaned user reference', function (done) {
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

          // Save a new Order number
          agent.post('/api/orderNumbers')
            .send(orderNumber)
            .expect(200)
            .end(function (orderNumberSaveErr, orderNumberSaveRes) {
              // Handle Order number save error
              if (orderNumberSaveErr) {
                return done(orderNumberSaveErr);
              }

              // Set assertions on new Order number
              (orderNumberSaveRes.body.name).should.equal(orderNumber.name);
              should.exist(orderNumberSaveRes.body.user);
              should.equal(orderNumberSaveRes.body.user._id, orphanId);

              // force the Order number to have an orphaned user reference
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

                    // Get the Order number
                    agent.get('/api/orderNumbers/' + orderNumberSaveRes.body._id)
                      .expect(200)
                      .end(function (orderNumberInfoErr, orderNumberInfoRes) {
                        // Handle Order number error
                        if (orderNumberInfoErr) {
                          return done(orderNumberInfoErr);
                        }

                        // Set assertions
                        (orderNumberInfoRes.body._id).should.equal(orderNumberSaveRes.body._id);
                        (orderNumberInfoRes.body.name).should.equal(orderNumber.name);
                        should.equal(orderNumberInfoRes.body.user, undefined);

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
      OrderNumber.remove().exec(done);
    });
  });
});

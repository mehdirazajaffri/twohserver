'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Ordersuk = mongoose.model('Ordersuk'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  ordersuk;

/**
 * Ordersuk routes tests
 */
describe('Ordersuk CRUD tests', function () {

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

    // Save a user to the test db and create new Ordersuk
    user.save(function () {
      ordersuk = {
        name: 'Ordersuk name'
      };

      done();
    });
  });

  it('should be able to save a Ordersuk if logged in', function (done) {
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

        // Save a new Ordersuk
        agent.post('/api/ordersuks')
          .send(ordersuk)
          .expect(200)
          .end(function (ordersukSaveErr, ordersukSaveRes) {
            // Handle Ordersuk save error
            if (ordersukSaveErr) {
              return done(ordersukSaveErr);
            }

            // Get a list of Ordersuks
            agent.get('/api/ordersuks')
              .end(function (ordersuksGetErr, ordersuksGetRes) {
                // Handle Ordersuks save error
                if (ordersuksGetErr) {
                  return done(ordersuksGetErr);
                }

                // Get Ordersuks list
                var ordersuks = ordersuksGetRes.body;

                // Set assertions
                (ordersuks[0].user._id).should.equal(userId);
                (ordersuks[0].name).should.match('Ordersuk name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Ordersuk if not logged in', function (done) {
    agent.post('/api/ordersuks')
      .send(ordersuk)
      .expect(403)
      .end(function (ordersukSaveErr, ordersukSaveRes) {
        // Call the assertion callback
        done(ordersukSaveErr);
      });
  });

  it('should not be able to save an Ordersuk if no name is provided', function (done) {
    // Invalidate name field
    ordersuk.name = '';

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

        // Save a new Ordersuk
        agent.post('/api/ordersuks')
          .send(ordersuk)
          .expect(400)
          .end(function (ordersukSaveErr, ordersukSaveRes) {
            // Set message assertion
            (ordersukSaveRes.body.message).should.match('Please fill Ordersuk name');

            // Handle Ordersuk save error
            done(ordersukSaveErr);
          });
      });
  });

  it('should be able to update an Ordersuk if signed in', function (done) {
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

        // Save a new Ordersuk
        agent.post('/api/ordersuks')
          .send(ordersuk)
          .expect(200)
          .end(function (ordersukSaveErr, ordersukSaveRes) {
            // Handle Ordersuk save error
            if (ordersukSaveErr) {
              return done(ordersukSaveErr);
            }

            // Update Ordersuk name
            ordersuk.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Ordersuk
            agent.put('/api/ordersuks/' + ordersukSaveRes.body._id)
              .send(ordersuk)
              .expect(200)
              .end(function (ordersukUpdateErr, ordersukUpdateRes) {
                // Handle Ordersuk update error
                if (ordersukUpdateErr) {
                  return done(ordersukUpdateErr);
                }

                // Set assertions
                (ordersukUpdateRes.body._id).should.equal(ordersukSaveRes.body._id);
                (ordersukUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Ordersuks if not signed in', function (done) {
    // Create new Ordersuk model instance
    var ordersukObj = new Ordersuk(ordersuk);

    // Save the ordersuk
    ordersukObj.save(function () {
      // Request Ordersuks
      request(app).get('/api/ordersuks')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Ordersuk if not signed in', function (done) {
    // Create new Ordersuk model instance
    var ordersukObj = new Ordersuk(ordersuk);

    // Save the Ordersuk
    ordersukObj.save(function () {
      request(app).get('/api/ordersuks/' + ordersukObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', ordersuk.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Ordersuk with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/ordersuks/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Ordersuk is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Ordersuk which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Ordersuk
    request(app).get('/api/ordersuks/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Ordersuk with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Ordersuk if signed in', function (done) {
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

        // Save a new Ordersuk
        agent.post('/api/ordersuks')
          .send(ordersuk)
          .expect(200)
          .end(function (ordersukSaveErr, ordersukSaveRes) {
            // Handle Ordersuk save error
            if (ordersukSaveErr) {
              return done(ordersukSaveErr);
            }

            // Delete an existing Ordersuk
            agent.delete('/api/ordersuks/' + ordersukSaveRes.body._id)
              .send(ordersuk)
              .expect(200)
              .end(function (ordersukDeleteErr, ordersukDeleteRes) {
                // Handle ordersuk error error
                if (ordersukDeleteErr) {
                  return done(ordersukDeleteErr);
                }

                // Set assertions
                (ordersukDeleteRes.body._id).should.equal(ordersukSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Ordersuk if not signed in', function (done) {
    // Set Ordersuk user
    ordersuk.user = user;

    // Create new Ordersuk model instance
    var ordersukObj = new Ordersuk(ordersuk);

    // Save the Ordersuk
    ordersukObj.save(function () {
      // Try deleting Ordersuk
      request(app).delete('/api/ordersuks/' + ordersukObj._id)
        .expect(403)
        .end(function (ordersukDeleteErr, ordersukDeleteRes) {
          // Set message assertion
          (ordersukDeleteRes.body.message).should.match('User is not authorized');

          // Handle Ordersuk error error
          done(ordersukDeleteErr);
        });

    });
  });

  it('should be able to get a single Ordersuk that has an orphaned user reference', function (done) {
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

          // Save a new Ordersuk
          agent.post('/api/ordersuks')
            .send(ordersuk)
            .expect(200)
            .end(function (ordersukSaveErr, ordersukSaveRes) {
              // Handle Ordersuk save error
              if (ordersukSaveErr) {
                return done(ordersukSaveErr);
              }

              // Set assertions on new Ordersuk
              (ordersukSaveRes.body.name).should.equal(ordersuk.name);
              should.exist(ordersukSaveRes.body.user);
              should.equal(ordersukSaveRes.body.user._id, orphanId);

              // force the Ordersuk to have an orphaned user reference
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

                    // Get the Ordersuk
                    agent.get('/api/ordersuks/' + ordersukSaveRes.body._id)
                      .expect(200)
                      .end(function (ordersukInfoErr, ordersukInfoRes) {
                        // Handle Ordersuk error
                        if (ordersukInfoErr) {
                          return done(ordersukInfoErr);
                        }

                        // Set assertions
                        (ordersukInfoRes.body._id).should.equal(ordersukSaveRes.body._id);
                        (ordersukInfoRes.body.name).should.equal(ordersuk.name);
                        should.equal(ordersukInfoRes.body.user, undefined);

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
      Ordersuk.remove().exec(done);
    });
  });
});

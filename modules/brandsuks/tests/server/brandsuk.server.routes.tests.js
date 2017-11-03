'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Brandsuk = mongoose.model('Brandsuk'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  brandsuk;

/**
 * Brandsuk routes tests
 */
describe('Brandsuk CRUD tests', function () {

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

    // Save a user to the test db and create new Brandsuk
    user.save(function () {
      brandsuk = {
        name: 'Brandsuk name'
      };

      done();
    });
  });

  it('should be able to save a Brandsuk if logged in', function (done) {
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

        // Save a new Brandsuk
        agent.post('/api/brandsuks')
          .send(brandsuk)
          .expect(200)
          .end(function (brandsukSaveErr, brandsukSaveRes) {
            // Handle Brandsuk save error
            if (brandsukSaveErr) {
              return done(brandsukSaveErr);
            }

            // Get a list of Brandsuks
            agent.get('/api/brandsuks')
              .end(function (brandsuksGetErr, brandsuksGetRes) {
                // Handle Brandsuks save error
                if (brandsuksGetErr) {
                  return done(brandsuksGetErr);
                }

                // Get Brandsuks list
                var brandsuks = brandsuksGetRes.body;

                // Set assertions
                (brandsuks[0].user._id).should.equal(userId);
                (brandsuks[0].name).should.match('Brandsuk name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Brandsuk if not logged in', function (done) {
    agent.post('/api/brandsuks')
      .send(brandsuk)
      .expect(403)
      .end(function (brandsukSaveErr, brandsukSaveRes) {
        // Call the assertion callback
        done(brandsukSaveErr);
      });
  });

  it('should not be able to save an Brandsuk if no name is provided', function (done) {
    // Invalidate name field
    brandsuk.name = '';

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

        // Save a new Brandsuk
        agent.post('/api/brandsuks')
          .send(brandsuk)
          .expect(400)
          .end(function (brandsukSaveErr, brandsukSaveRes) {
            // Set message assertion
            (brandsukSaveRes.body.message).should.match('Please fill Brandsuk name');

            // Handle Brandsuk save error
            done(brandsukSaveErr);
          });
      });
  });

  it('should be able to update an Brandsuk if signed in', function (done) {
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

        // Save a new Brandsuk
        agent.post('/api/brandsuks')
          .send(brandsuk)
          .expect(200)
          .end(function (brandsukSaveErr, brandsukSaveRes) {
            // Handle Brandsuk save error
            if (brandsukSaveErr) {
              return done(brandsukSaveErr);
            }

            // Update Brandsuk name
            brandsuk.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Brandsuk
            agent.put('/api/brandsuks/' + brandsukSaveRes.body._id)
              .send(brandsuk)
              .expect(200)
              .end(function (brandsukUpdateErr, brandsukUpdateRes) {
                // Handle Brandsuk update error
                if (brandsukUpdateErr) {
                  return done(brandsukUpdateErr);
                }

                // Set assertions
                (brandsukUpdateRes.body._id).should.equal(brandsukSaveRes.body._id);
                (brandsukUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Brandsuks if not signed in', function (done) {
    // Create new Brandsuk model instance
    var brandsukObj = new Brandsuk(brandsuk);

    // Save the brandsuk
    brandsukObj.save(function () {
      // Request Brandsuks
      request(app).get('/api/brandsuks')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Brandsuk if not signed in', function (done) {
    // Create new Brandsuk model instance
    var brandsukObj = new Brandsuk(brandsuk);

    // Save the Brandsuk
    brandsukObj.save(function () {
      request(app).get('/api/brandsuks/' + brandsukObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', brandsuk.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Brandsuk with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/brandsuks/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Brandsuk is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Brandsuk which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Brandsuk
    request(app).get('/api/brandsuks/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Brandsuk with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Brandsuk if signed in', function (done) {
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

        // Save a new Brandsuk
        agent.post('/api/brandsuks')
          .send(brandsuk)
          .expect(200)
          .end(function (brandsukSaveErr, brandsukSaveRes) {
            // Handle Brandsuk save error
            if (brandsukSaveErr) {
              return done(brandsukSaveErr);
            }

            // Delete an existing Brandsuk
            agent.delete('/api/brandsuks/' + brandsukSaveRes.body._id)
              .send(brandsuk)
              .expect(200)
              .end(function (brandsukDeleteErr, brandsukDeleteRes) {
                // Handle brandsuk error error
                if (brandsukDeleteErr) {
                  return done(brandsukDeleteErr);
                }

                // Set assertions
                (brandsukDeleteRes.body._id).should.equal(brandsukSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Brandsuk if not signed in', function (done) {
    // Set Brandsuk user
    brandsuk.user = user;

    // Create new Brandsuk model instance
    var brandsukObj = new Brandsuk(brandsuk);

    // Save the Brandsuk
    brandsukObj.save(function () {
      // Try deleting Brandsuk
      request(app).delete('/api/brandsuks/' + brandsukObj._id)
        .expect(403)
        .end(function (brandsukDeleteErr, brandsukDeleteRes) {
          // Set message assertion
          (brandsukDeleteRes.body.message).should.match('User is not authorized');

          // Handle Brandsuk error error
          done(brandsukDeleteErr);
        });

    });
  });

  it('should be able to get a single Brandsuk that has an orphaned user reference', function (done) {
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

          // Save a new Brandsuk
          agent.post('/api/brandsuks')
            .send(brandsuk)
            .expect(200)
            .end(function (brandsukSaveErr, brandsukSaveRes) {
              // Handle Brandsuk save error
              if (brandsukSaveErr) {
                return done(brandsukSaveErr);
              }

              // Set assertions on new Brandsuk
              (brandsukSaveRes.body.name).should.equal(brandsuk.name);
              should.exist(brandsukSaveRes.body.user);
              should.equal(brandsukSaveRes.body.user._id, orphanId);

              // force the Brandsuk to have an orphaned user reference
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

                    // Get the Brandsuk
                    agent.get('/api/brandsuks/' + brandsukSaveRes.body._id)
                      .expect(200)
                      .end(function (brandsukInfoErr, brandsukInfoRes) {
                        // Handle Brandsuk error
                        if (brandsukInfoErr) {
                          return done(brandsukInfoErr);
                        }

                        // Set assertions
                        (brandsukInfoRes.body._id).should.equal(brandsukSaveRes.body._id);
                        (brandsukInfoRes.body.name).should.equal(brandsuk.name);
                        should.equal(brandsukInfoRes.body.user, undefined);

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
      Brandsuk.remove().exec(done);
    });
  });
});

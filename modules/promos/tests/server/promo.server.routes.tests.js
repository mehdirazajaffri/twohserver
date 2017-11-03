'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Promo = mongoose.model('Promo'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  promo;

/**
 * Promo routes tests
 */
describe('Promo CRUD tests', function () {

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

    // Save a user to the test db and create new Promo
    user.save(function () {
      promo = {
        name: 'Promo name'
      };

      done();
    });
  });

  it('should be able to save a Promo if logged in', function (done) {
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

        // Save a new Promo
        agent.post('/api/promos')
          .send(promo)
          .expect(200)
          .end(function (promoSaveErr, promoSaveRes) {
            // Handle Promo save error
            if (promoSaveErr) {
              return done(promoSaveErr);
            }

            // Get a list of Promos
            agent.get('/api/promos')
              .end(function (promosGetErr, promosGetRes) {
                // Handle Promos save error
                if (promosGetErr) {
                  return done(promosGetErr);
                }

                // Get Promos list
                var promos = promosGetRes.body;

                // Set assertions
                (promos[0].user._id).should.equal(userId);
                (promos[0].name).should.match('Promo name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Promo if not logged in', function (done) {
    agent.post('/api/promos')
      .send(promo)
      .expect(403)
      .end(function (promoSaveErr, promoSaveRes) {
        // Call the assertion callback
        done(promoSaveErr);
      });
  });

  it('should not be able to save an Promo if no name is provided', function (done) {
    // Invalidate name field
    promo.name = '';

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

        // Save a new Promo
        agent.post('/api/promos')
          .send(promo)
          .expect(400)
          .end(function (promoSaveErr, promoSaveRes) {
            // Set message assertion
            (promoSaveRes.body.message).should.match('Please fill Promo name');

            // Handle Promo save error
            done(promoSaveErr);
          });
      });
  });

  it('should be able to update an Promo if signed in', function (done) {
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

        // Save a new Promo
        agent.post('/api/promos')
          .send(promo)
          .expect(200)
          .end(function (promoSaveErr, promoSaveRes) {
            // Handle Promo save error
            if (promoSaveErr) {
              return done(promoSaveErr);
            }

            // Update Promo name
            promo.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Promo
            agent.put('/api/promos/' + promoSaveRes.body._id)
              .send(promo)
              .expect(200)
              .end(function (promoUpdateErr, promoUpdateRes) {
                // Handle Promo update error
                if (promoUpdateErr) {
                  return done(promoUpdateErr);
                }

                // Set assertions
                (promoUpdateRes.body._id).should.equal(promoSaveRes.body._id);
                (promoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Promos if not signed in', function (done) {
    // Create new Promo model instance
    var promoObj = new Promo(promo);

    // Save the promo
    promoObj.save(function () {
      // Request Promos
      request(app).get('/api/promos')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Promo if not signed in', function (done) {
    // Create new Promo model instance
    var promoObj = new Promo(promo);

    // Save the Promo
    promoObj.save(function () {
      request(app).get('/api/promos/' + promoObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', promo.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Promo with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/promos/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Promo is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Promo which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Promo
    request(app).get('/api/promos/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Promo with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Promo if signed in', function (done) {
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

        // Save a new Promo
        agent.post('/api/promos')
          .send(promo)
          .expect(200)
          .end(function (promoSaveErr, promoSaveRes) {
            // Handle Promo save error
            if (promoSaveErr) {
              return done(promoSaveErr);
            }

            // Delete an existing Promo
            agent.delete('/api/promos/' + promoSaveRes.body._id)
              .send(promo)
              .expect(200)
              .end(function (promoDeleteErr, promoDeleteRes) {
                // Handle promo error error
                if (promoDeleteErr) {
                  return done(promoDeleteErr);
                }

                // Set assertions
                (promoDeleteRes.body._id).should.equal(promoSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Promo if not signed in', function (done) {
    // Set Promo user
    promo.user = user;

    // Create new Promo model instance
    var promoObj = new Promo(promo);

    // Save the Promo
    promoObj.save(function () {
      // Try deleting Promo
      request(app).delete('/api/promos/' + promoObj._id)
        .expect(403)
        .end(function (promoDeleteErr, promoDeleteRes) {
          // Set message assertion
          (promoDeleteRes.body.message).should.match('User is not authorized');

          // Handle Promo error error
          done(promoDeleteErr);
        });

    });
  });

  it('should be able to get a single Promo that has an orphaned user reference', function (done) {
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

          // Save a new Promo
          agent.post('/api/promos')
            .send(promo)
            .expect(200)
            .end(function (promoSaveErr, promoSaveRes) {
              // Handle Promo save error
              if (promoSaveErr) {
                return done(promoSaveErr);
              }

              // Set assertions on new Promo
              (promoSaveRes.body.name).should.equal(promo.name);
              should.exist(promoSaveRes.body.user);
              should.equal(promoSaveRes.body.user._id, orphanId);

              // force the Promo to have an orphaned user reference
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

                    // Get the Promo
                    agent.get('/api/promos/' + promoSaveRes.body._id)
                      .expect(200)
                      .end(function (promoInfoErr, promoInfoRes) {
                        // Handle Promo error
                        if (promoInfoErr) {
                          return done(promoInfoErr);
                        }

                        // Set assertions
                        (promoInfoRes.body._id).should.equal(promoSaveRes.body._id);
                        (promoInfoRes.body.name).should.equal(promo.name);
                        should.equal(promoInfoRes.body.user, undefined);

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
      Promo.remove().exec(done);
    });
  });
});

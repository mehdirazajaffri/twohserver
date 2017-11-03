'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  PromotionBar = mongoose.model('PromotionBar'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  promotionBar;

/**
 * Promotion bar routes tests
 */
describe('Promotion bar CRUD tests', function () {

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

    // Save a user to the test db and create new Promotion bar
    user.save(function () {
      promotionBar = {
        name: 'Promotion bar name'
      };

      done();
    });
  });

  it('should be able to save a Promotion bar if logged in', function (done) {
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

        // Save a new Promotion bar
        agent.post('/api/promotionBars')
          .send(promotionBar)
          .expect(200)
          .end(function (promotionBarSaveErr, promotionBarSaveRes) {
            // Handle Promotion bar save error
            if (promotionBarSaveErr) {
              return done(promotionBarSaveErr);
            }

            // Get a list of Promotion bars
            agent.get('/api/promotionBars')
              .end(function (promotionBarsGetErr, promotionBarsGetRes) {
                // Handle Promotion bars save error
                if (promotionBarsGetErr) {
                  return done(promotionBarsGetErr);
                }

                // Get Promotion bars list
                var promotionBars = promotionBarsGetRes.body;

                // Set assertions
                (promotionBars[0].user._id).should.equal(userId);
                (promotionBars[0].name).should.match('Promotion bar name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Promotion bar if not logged in', function (done) {
    agent.post('/api/promotionBars')
      .send(promotionBar)
      .expect(403)
      .end(function (promotionBarSaveErr, promotionBarSaveRes) {
        // Call the assertion callback
        done(promotionBarSaveErr);
      });
  });

  it('should not be able to save an Promotion bar if no name is provided', function (done) {
    // Invalidate name field
    promotionBar.name = '';

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

        // Save a new Promotion bar
        agent.post('/api/promotionBars')
          .send(promotionBar)
          .expect(400)
          .end(function (promotionBarSaveErr, promotionBarSaveRes) {
            // Set message assertion
            (promotionBarSaveRes.body.message).should.match('Please fill Promotion bar name');

            // Handle Promotion bar save error
            done(promotionBarSaveErr);
          });
      });
  });

  it('should be able to update an Promotion bar if signed in', function (done) {
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

        // Save a new Promotion bar
        agent.post('/api/promotionBars')
          .send(promotionBar)
          .expect(200)
          .end(function (promotionBarSaveErr, promotionBarSaveRes) {
            // Handle Promotion bar save error
            if (promotionBarSaveErr) {
              return done(promotionBarSaveErr);
            }

            // Update Promotion bar name
            promotionBar.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Promotion bar
            agent.put('/api/promotionBars/' + promotionBarSaveRes.body._id)
              .send(promotionBar)
              .expect(200)
              .end(function (promotionBarUpdateErr, promotionBarUpdateRes) {
                // Handle Promotion bar update error
                if (promotionBarUpdateErr) {
                  return done(promotionBarUpdateErr);
                }

                // Set assertions
                (promotionBarUpdateRes.body._id).should.equal(promotionBarSaveRes.body._id);
                (promotionBarUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Promotion bars if not signed in', function (done) {
    // Create new Promotion bar model instance
    var promotionBarObj = new PromotionBar(promotionBar);

    // Save the promotionBar
    promotionBarObj.save(function () {
      // Request Promotion bars
      request(app).get('/api/promotionBars')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Promotion bar if not signed in', function (done) {
    // Create new Promotion bar model instance
    var promotionBarObj = new PromotionBar(promotionBar);

    // Save the Promotion bar
    promotionBarObj.save(function () {
      request(app).get('/api/promotionBars/' + promotionBarObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', promotionBar.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Promotion bar with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/promotionBars/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Promotion bar is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Promotion bar which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Promotion bar
    request(app).get('/api/promotionBars/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Promotion bar with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Promotion bar if signed in', function (done) {
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

        // Save a new Promotion bar
        agent.post('/api/promotionBars')
          .send(promotionBar)
          .expect(200)
          .end(function (promotionBarSaveErr, promotionBarSaveRes) {
            // Handle Promotion bar save error
            if (promotionBarSaveErr) {
              return done(promotionBarSaveErr);
            }

            // Delete an existing Promotion bar
            agent.delete('/api/promotionBars/' + promotionBarSaveRes.body._id)
              .send(promotionBar)
              .expect(200)
              .end(function (promotionBarDeleteErr, promotionBarDeleteRes) {
                // Handle promotionBar error error
                if (promotionBarDeleteErr) {
                  return done(promotionBarDeleteErr);
                }

                // Set assertions
                (promotionBarDeleteRes.body._id).should.equal(promotionBarSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Promotion bar if not signed in', function (done) {
    // Set Promotion bar user
    promotionBar.user = user;

    // Create new Promotion bar model instance
    var promotionBarObj = new PromotionBar(promotionBar);

    // Save the Promotion bar
    promotionBarObj.save(function () {
      // Try deleting Promotion bar
      request(app).delete('/api/promotionBars/' + promotionBarObj._id)
        .expect(403)
        .end(function (promotionBarDeleteErr, promotionBarDeleteRes) {
          // Set message assertion
          (promotionBarDeleteRes.body.message).should.match('User is not authorized');

          // Handle Promotion bar error error
          done(promotionBarDeleteErr);
        });

    });
  });

  it('should be able to get a single Promotion bar that has an orphaned user reference', function (done) {
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

          // Save a new Promotion bar
          agent.post('/api/promotionBars')
            .send(promotionBar)
            .expect(200)
            .end(function (promotionBarSaveErr, promotionBarSaveRes) {
              // Handle Promotion bar save error
              if (promotionBarSaveErr) {
                return done(promotionBarSaveErr);
              }

              // Set assertions on new Promotion bar
              (promotionBarSaveRes.body.name).should.equal(promotionBar.name);
              should.exist(promotionBarSaveRes.body.user);
              should.equal(promotionBarSaveRes.body.user._id, orphanId);

              // force the Promotion bar to have an orphaned user reference
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

                    // Get the Promotion bar
                    agent.get('/api/promotionBars/' + promotionBarSaveRes.body._id)
                      .expect(200)
                      .end(function (promotionBarInfoErr, promotionBarInfoRes) {
                        // Handle Promotion bar error
                        if (promotionBarInfoErr) {
                          return done(promotionBarInfoErr);
                        }

                        // Set assertions
                        (promotionBarInfoRes.body._id).should.equal(promotionBarSaveRes.body._id);
                        (promotionBarInfoRes.body.name).should.equal(promotionBar.name);
                        should.equal(promotionBarInfoRes.body.user, undefined);

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
      PromotionBar.remove().exec(done);
    });
  });
});

'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Reviewmailer = mongoose.model('Reviewmailer'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  reviewmailer;

/**
 * Reviewmailer routes tests
 */
describe('Reviewmailer CRUD tests', function () {

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

    // Save a user to the test db and create new Reviewmailer
    user.save(function () {
      reviewmailer = {
        name: 'Reviewmailer name'
      };

      done();
    });
  });

  it('should be able to save a Reviewmailer if logged in', function (done) {
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

        // Save a new Reviewmailer
        agent.post('/api/reviewmailers')
          .send(reviewmailer)
          .expect(200)
          .end(function (reviewmailerSaveErr, reviewmailerSaveRes) {
            // Handle Reviewmailer save error
            if (reviewmailerSaveErr) {
              return done(reviewmailerSaveErr);
            }

            // Get a list of Reviewmailers
            agent.get('/api/reviewmailers')
              .end(function (reviewmailersGetErr, reviewmailersGetRes) {
                // Handle Reviewmailers save error
                if (reviewmailersGetErr) {
                  return done(reviewmailersGetErr);
                }

                // Get Reviewmailers list
                var reviewmailers = reviewmailersGetRes.body;

                // Set assertions
                (reviewmailers[0].user._id).should.equal(userId);
                (reviewmailers[0].name).should.match('Reviewmailer name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Reviewmailer if not logged in', function (done) {
    agent.post('/api/reviewmailers')
      .send(reviewmailer)
      .expect(403)
      .end(function (reviewmailerSaveErr, reviewmailerSaveRes) {
        // Call the assertion callback
        done(reviewmailerSaveErr);
      });
  });

  it('should not be able to save an Reviewmailer if no name is provided', function (done) {
    // Invalidate name field
    reviewmailer.name = '';

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

        // Save a new Reviewmailer
        agent.post('/api/reviewmailers')
          .send(reviewmailer)
          .expect(400)
          .end(function (reviewmailerSaveErr, reviewmailerSaveRes) {
            // Set message assertion
            (reviewmailerSaveRes.body.message).should.match('Please fill Reviewmailer name');

            // Handle Reviewmailer save error
            done(reviewmailerSaveErr);
          });
      });
  });

  it('should be able to update an Reviewmailer if signed in', function (done) {
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

        // Save a new Reviewmailer
        agent.post('/api/reviewmailers')
          .send(reviewmailer)
          .expect(200)
          .end(function (reviewmailerSaveErr, reviewmailerSaveRes) {
            // Handle Reviewmailer save error
            if (reviewmailerSaveErr) {
              return done(reviewmailerSaveErr);
            }

            // Update Reviewmailer name
            reviewmailer.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Reviewmailer
            agent.put('/api/reviewmailers/' + reviewmailerSaveRes.body._id)
              .send(reviewmailer)
              .expect(200)
              .end(function (reviewmailerUpdateErr, reviewmailerUpdateRes) {
                // Handle Reviewmailer update error
                if (reviewmailerUpdateErr) {
                  return done(reviewmailerUpdateErr);
                }

                // Set assertions
                (reviewmailerUpdateRes.body._id).should.equal(reviewmailerSaveRes.body._id);
                (reviewmailerUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Reviewmailers if not signed in', function (done) {
    // Create new Reviewmailer model instance
    var reviewmailerObj = new Reviewmailer(reviewmailer);

    // Save the reviewmailer
    reviewmailerObj.save(function () {
      // Request Reviewmailers
      request(app).get('/api/reviewmailers')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Reviewmailer if not signed in', function (done) {
    // Create new Reviewmailer model instance
    var reviewmailerObj = new Reviewmailer(reviewmailer);

    // Save the Reviewmailer
    reviewmailerObj.save(function () {
      request(app).get('/api/reviewmailers/' + reviewmailerObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', reviewmailer.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Reviewmailer with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/reviewmailers/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Reviewmailer is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Reviewmailer which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Reviewmailer
    request(app).get('/api/reviewmailers/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Reviewmailer with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Reviewmailer if signed in', function (done) {
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

        // Save a new Reviewmailer
        agent.post('/api/reviewmailers')
          .send(reviewmailer)
          .expect(200)
          .end(function (reviewmailerSaveErr, reviewmailerSaveRes) {
            // Handle Reviewmailer save error
            if (reviewmailerSaveErr) {
              return done(reviewmailerSaveErr);
            }

            // Delete an existing Reviewmailer
            agent.delete('/api/reviewmailers/' + reviewmailerSaveRes.body._id)
              .send(reviewmailer)
              .expect(200)
              .end(function (reviewmailerDeleteErr, reviewmailerDeleteRes) {
                // Handle reviewmailer error error
                if (reviewmailerDeleteErr) {
                  return done(reviewmailerDeleteErr);
                }

                // Set assertions
                (reviewmailerDeleteRes.body._id).should.equal(reviewmailerSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Reviewmailer if not signed in', function (done) {
    // Set Reviewmailer user
    reviewmailer.user = user;

    // Create new Reviewmailer model instance
    var reviewmailerObj = new Reviewmailer(reviewmailer);

    // Save the Reviewmailer
    reviewmailerObj.save(function () {
      // Try deleting Reviewmailer
      request(app).delete('/api/reviewmailers/' + reviewmailerObj._id)
        .expect(403)
        .end(function (reviewmailerDeleteErr, reviewmailerDeleteRes) {
          // Set message assertion
          (reviewmailerDeleteRes.body.message).should.match('User is not authorized');

          // Handle Reviewmailer error error
          done(reviewmailerDeleteErr);
        });

    });
  });

  it('should be able to get a single Reviewmailer that has an orphaned user reference', function (done) {
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

          // Save a new Reviewmailer
          agent.post('/api/reviewmailers')
            .send(reviewmailer)
            .expect(200)
            .end(function (reviewmailerSaveErr, reviewmailerSaveRes) {
              // Handle Reviewmailer save error
              if (reviewmailerSaveErr) {
                return done(reviewmailerSaveErr);
              }

              // Set assertions on new Reviewmailer
              (reviewmailerSaveRes.body.name).should.equal(reviewmailer.name);
              should.exist(reviewmailerSaveRes.body.user);
              should.equal(reviewmailerSaveRes.body.user._id, orphanId);

              // force the Reviewmailer to have an orphaned user reference
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

                    // Get the Reviewmailer
                    agent.get('/api/reviewmailers/' + reviewmailerSaveRes.body._id)
                      .expect(200)
                      .end(function (reviewmailerInfoErr, reviewmailerInfoRes) {
                        // Handle Reviewmailer error
                        if (reviewmailerInfoErr) {
                          return done(reviewmailerInfoErr);
                        }

                        // Set assertions
                        (reviewmailerInfoRes.body._id).should.equal(reviewmailerSaveRes.body._id);
                        (reviewmailerInfoRes.body.name).should.equal(reviewmailer.name);
                        should.equal(reviewmailerInfoRes.body.user, undefined);

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
      Reviewmailer.remove().exec(done);
    });
  });
});

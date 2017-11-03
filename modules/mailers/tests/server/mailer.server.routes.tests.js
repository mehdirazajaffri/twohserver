'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Mailer = mongoose.model('Mailer'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  mailer;

/**
 * Mailer routes tests
 */
describe('Mailer CRUD tests', function () {

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

    // Save a user to the test db and create new Mailer
    user.save(function () {
      mailer = {
        name: 'Mailer name'
      };

      done();
    });
  });

  it('should be able to save a Mailer if logged in', function (done) {
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

        // Save a new Mailer
        agent.post('/api/mailers')
          .send(mailer)
          .expect(200)
          .end(function (mailerSaveErr, mailerSaveRes) {
            // Handle Mailer save error
            if (mailerSaveErr) {
              return done(mailerSaveErr);
            }

            // Get a list of Mailers
            agent.get('/api/mailers')
              .end(function (mailersGetErr, mailersGetRes) {
                // Handle Mailers save error
                if (mailersGetErr) {
                  return done(mailersGetErr);
                }

                // Get Mailers list
                var mailers = mailersGetRes.body;

                // Set assertions
                (mailers[0].user._id).should.equal(userId);
                (mailers[0].name).should.match('Mailer name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Mailer if not logged in', function (done) {
    agent.post('/api/mailers')
      .send(mailer)
      .expect(403)
      .end(function (mailerSaveErr, mailerSaveRes) {
        // Call the assertion callback
        done(mailerSaveErr);
      });
  });

  it('should not be able to save an Mailer if no name is provided', function (done) {
    // Invalidate name field
    mailer.name = '';

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

        // Save a new Mailer
        agent.post('/api/mailers')
          .send(mailer)
          .expect(400)
          .end(function (mailerSaveErr, mailerSaveRes) {
            // Set message assertion
            (mailerSaveRes.body.message).should.match('Please fill Mailer name');

            // Handle Mailer save error
            done(mailerSaveErr);
          });
      });
  });

  it('should be able to update an Mailer if signed in', function (done) {
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

        // Save a new Mailer
        agent.post('/api/mailers')
          .send(mailer)
          .expect(200)
          .end(function (mailerSaveErr, mailerSaveRes) {
            // Handle Mailer save error
            if (mailerSaveErr) {
              return done(mailerSaveErr);
            }

            // Update Mailer name
            mailer.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Mailer
            agent.put('/api/mailers/' + mailerSaveRes.body._id)
              .send(mailer)
              .expect(200)
              .end(function (mailerUpdateErr, mailerUpdateRes) {
                // Handle Mailer update error
                if (mailerUpdateErr) {
                  return done(mailerUpdateErr);
                }

                // Set assertions
                (mailerUpdateRes.body._id).should.equal(mailerSaveRes.body._id);
                (mailerUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Mailers if not signed in', function (done) {
    // Create new Mailer model instance
    var mailerObj = new Mailer(mailer);

    // Save the mailer
    mailerObj.save(function () {
      // Request Mailers
      request(app).get('/api/mailers')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Mailer if not signed in', function (done) {
    // Create new Mailer model instance
    var mailerObj = new Mailer(mailer);

    // Save the Mailer
    mailerObj.save(function () {
      request(app).get('/api/mailers/' + mailerObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', mailer.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Mailer with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/mailers/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Mailer is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Mailer which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Mailer
    request(app).get('/api/mailers/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Mailer with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Mailer if signed in', function (done) {
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

        // Save a new Mailer
        agent.post('/api/mailers')
          .send(mailer)
          .expect(200)
          .end(function (mailerSaveErr, mailerSaveRes) {
            // Handle Mailer save error
            if (mailerSaveErr) {
              return done(mailerSaveErr);
            }

            // Delete an existing Mailer
            agent.delete('/api/mailers/' + mailerSaveRes.body._id)
              .send(mailer)
              .expect(200)
              .end(function (mailerDeleteErr, mailerDeleteRes) {
                // Handle mailer error error
                if (mailerDeleteErr) {
                  return done(mailerDeleteErr);
                }

                // Set assertions
                (mailerDeleteRes.body._id).should.equal(mailerSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Mailer if not signed in', function (done) {
    // Set Mailer user
    mailer.user = user;

    // Create new Mailer model instance
    var mailerObj = new Mailer(mailer);

    // Save the Mailer
    mailerObj.save(function () {
      // Try deleting Mailer
      request(app).delete('/api/mailers/' + mailerObj._id)
        .expect(403)
        .end(function (mailerDeleteErr, mailerDeleteRes) {
          // Set message assertion
          (mailerDeleteRes.body.message).should.match('User is not authorized');

          // Handle Mailer error error
          done(mailerDeleteErr);
        });

    });
  });

  it('should be able to get a single Mailer that has an orphaned user reference', function (done) {
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

          // Save a new Mailer
          agent.post('/api/mailers')
            .send(mailer)
            .expect(200)
            .end(function (mailerSaveErr, mailerSaveRes) {
              // Handle Mailer save error
              if (mailerSaveErr) {
                return done(mailerSaveErr);
              }

              // Set assertions on new Mailer
              (mailerSaveRes.body.name).should.equal(mailer.name);
              should.exist(mailerSaveRes.body.user);
              should.equal(mailerSaveRes.body.user._id, orphanId);

              // force the Mailer to have an orphaned user reference
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

                    // Get the Mailer
                    agent.get('/api/mailers/' + mailerSaveRes.body._id)
                      .expect(200)
                      .end(function (mailerInfoErr, mailerInfoRes) {
                        // Handle Mailer error
                        if (mailerInfoErr) {
                          return done(mailerInfoErr);
                        }

                        // Set assertions
                        (mailerInfoRes.body._id).should.equal(mailerSaveRes.body._id);
                        (mailerInfoRes.body.name).should.equal(mailer.name);
                        should.equal(mailerInfoRes.body.user, undefined);

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
      Mailer.remove().exec(done);
    });
  });
});

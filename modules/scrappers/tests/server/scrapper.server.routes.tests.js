'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Scrapper = mongoose.model('Scrapper'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  scrapper;

/**
 * Scrapper routes tests
 */
describe('Scrapper CRUD tests', function () {

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

    // Save a user to the test db and create new Scrapper
    user.save(function () {
      scrapper = {
        name: 'Scrapper name'
      };

      done();
    });
  });

  it('should be able to save a Scrapper if logged in', function (done) {
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

        // Save a new Scrapper
        agent.post('/api/scrappers')
          .send(scrapper)
          .expect(200)
          .end(function (scrapperSaveErr, scrapperSaveRes) {
            // Handle Scrapper save error
            if (scrapperSaveErr) {
              return done(scrapperSaveErr);
            }

            // Get a list of Scrappers
            agent.get('/api/scrappers')
              .end(function (scrappersGetErr, scrappersGetRes) {
                // Handle Scrappers save error
                if (scrappersGetErr) {
                  return done(scrappersGetErr);
                }

                // Get Scrappers list
                var scrappers = scrappersGetRes.body;

                // Set assertions
                (scrappers[0].user._id).should.equal(userId);
                (scrappers[0].name).should.match('Scrapper name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Scrapper if not logged in', function (done) {
    agent.post('/api/scrappers')
      .send(scrapper)
      .expect(403)
      .end(function (scrapperSaveErr, scrapperSaveRes) {
        // Call the assertion callback
        done(scrapperSaveErr);
      });
  });

  it('should not be able to save an Scrapper if no name is provided', function (done) {
    // Invalidate name field
    scrapper.name = '';

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

        // Save a new Scrapper
        agent.post('/api/scrappers')
          .send(scrapper)
          .expect(400)
          .end(function (scrapperSaveErr, scrapperSaveRes) {
            // Set message assertion
            (scrapperSaveRes.body.message).should.match('Please fill Scrapper name');

            // Handle Scrapper save error
            done(scrapperSaveErr);
          });
      });
  });

  it('should be able to update an Scrapper if signed in', function (done) {
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

        // Save a new Scrapper
        agent.post('/api/scrappers')
          .send(scrapper)
          .expect(200)
          .end(function (scrapperSaveErr, scrapperSaveRes) {
            // Handle Scrapper save error
            if (scrapperSaveErr) {
              return done(scrapperSaveErr);
            }

            // Update Scrapper name
            scrapper.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Scrapper
            agent.put('/api/scrappers/' + scrapperSaveRes.body._id)
              .send(scrapper)
              .expect(200)
              .end(function (scrapperUpdateErr, scrapperUpdateRes) {
                // Handle Scrapper update error
                if (scrapperUpdateErr) {
                  return done(scrapperUpdateErr);
                }

                // Set assertions
                (scrapperUpdateRes.body._id).should.equal(scrapperSaveRes.body._id);
                (scrapperUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Scrappers if not signed in', function (done) {
    // Create new Scrapper model instance
    var scrapperObj = new Scrapper(scrapper);

    // Save the scrapper
    scrapperObj.save(function () {
      // Request Scrappers
      request(app).get('/api/scrappers')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Scrapper if not signed in', function (done) {
    // Create new Scrapper model instance
    var scrapperObj = new Scrapper(scrapper);

    // Save the Scrapper
    scrapperObj.save(function () {
      request(app).get('/api/scrappers/' + scrapperObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', scrapper.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Scrapper with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/scrappers/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Scrapper is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Scrapper which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Scrapper
    request(app).get('/api/scrappers/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Scrapper with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Scrapper if signed in', function (done) {
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

        // Save a new Scrapper
        agent.post('/api/scrappers')
          .send(scrapper)
          .expect(200)
          .end(function (scrapperSaveErr, scrapperSaveRes) {
            // Handle Scrapper save error
            if (scrapperSaveErr) {
              return done(scrapperSaveErr);
            }

            // Delete an existing Scrapper
            agent.delete('/api/scrappers/' + scrapperSaveRes.body._id)
              .send(scrapper)
              .expect(200)
              .end(function (scrapperDeleteErr, scrapperDeleteRes) {
                // Handle scrapper error error
                if (scrapperDeleteErr) {
                  return done(scrapperDeleteErr);
                }

                // Set assertions
                (scrapperDeleteRes.body._id).should.equal(scrapperSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Scrapper if not signed in', function (done) {
    // Set Scrapper user
    scrapper.user = user;

    // Create new Scrapper model instance
    var scrapperObj = new Scrapper(scrapper);

    // Save the Scrapper
    scrapperObj.save(function () {
      // Try deleting Scrapper
      request(app).delete('/api/scrappers/' + scrapperObj._id)
        .expect(403)
        .end(function (scrapperDeleteErr, scrapperDeleteRes) {
          // Set message assertion
          (scrapperDeleteRes.body.message).should.match('User is not authorized');

          // Handle Scrapper error error
          done(scrapperDeleteErr);
        });

    });
  });

  it('should be able to get a single Scrapper that has an orphaned user reference', function (done) {
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

          // Save a new Scrapper
          agent.post('/api/scrappers')
            .send(scrapper)
            .expect(200)
            .end(function (scrapperSaveErr, scrapperSaveRes) {
              // Handle Scrapper save error
              if (scrapperSaveErr) {
                return done(scrapperSaveErr);
              }

              // Set assertions on new Scrapper
              (scrapperSaveRes.body.name).should.equal(scrapper.name);
              should.exist(scrapperSaveRes.body.user);
              should.equal(scrapperSaveRes.body.user._id, orphanId);

              // force the Scrapper to have an orphaned user reference
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

                    // Get the Scrapper
                    agent.get('/api/scrappers/' + scrapperSaveRes.body._id)
                      .expect(200)
                      .end(function (scrapperInfoErr, scrapperInfoRes) {
                        // Handle Scrapper error
                        if (scrapperInfoErr) {
                          return done(scrapperInfoErr);
                        }

                        // Set assertions
                        (scrapperInfoRes.body._id).should.equal(scrapperSaveRes.body._id);
                        (scrapperInfoRes.body.name).should.equal(scrapper.name);
                        should.equal(scrapperInfoRes.body.user, undefined);

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
      Scrapper.remove().exec(done);
    });
  });
});

'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Deal = mongoose.model('Deal'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  deal;

/**
 * Deal routes tests
 */
describe('Deal CRUD tests', function () {

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

    // Save a user to the test db and create new Deal
    user.save(function () {
      deal = {
        name: 'Deal name'
      };

      done();
    });
  });

  it('should be able to save a Deal if logged in', function (done) {
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

        // Save a new Deal
        agent.post('/api/deals')
          .send(deal)
          .expect(200)
          .end(function (dealSaveErr, dealSaveRes) {
            // Handle Deal save error
            if (dealSaveErr) {
              return done(dealSaveErr);
            }

            // Get a list of Deals
            agent.get('/api/deals')
              .end(function (dealsGetErr, dealsGetRes) {
                // Handle Deals save error
                if (dealsGetErr) {
                  return done(dealsGetErr);
                }

                // Get Deals list
                var deals = dealsGetRes.body;

                // Set assertions
                (deals[0].user._id).should.equal(userId);
                (deals[0].name).should.match('Deal name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Deal if not logged in', function (done) {
    agent.post('/api/deals')
      .send(deal)
      .expect(403)
      .end(function (dealSaveErr, dealSaveRes) {
        // Call the assertion callback
        done(dealSaveErr);
      });
  });

  it('should not be able to save an Deal if no name is provided', function (done) {
    // Invalidate name field
    deal.name = '';

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

        // Save a new Deal
        agent.post('/api/deals')
          .send(deal)
          .expect(400)
          .end(function (dealSaveErr, dealSaveRes) {
            // Set message assertion
            (dealSaveRes.body.message).should.match('Please fill Deal name');

            // Handle Deal save error
            done(dealSaveErr);
          });
      });
  });

  it('should be able to update an Deal if signed in', function (done) {
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

        // Save a new Deal
        agent.post('/api/deals')
          .send(deal)
          .expect(200)
          .end(function (dealSaveErr, dealSaveRes) {
            // Handle Deal save error
            if (dealSaveErr) {
              return done(dealSaveErr);
            }

            // Update Deal name
            deal.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Deal
            agent.put('/api/deals/' + dealSaveRes.body._id)
              .send(deal)
              .expect(200)
              .end(function (dealUpdateErr, dealUpdateRes) {
                // Handle Deal update error
                if (dealUpdateErr) {
                  return done(dealUpdateErr);
                }

                // Set assertions
                (dealUpdateRes.body._id).should.equal(dealSaveRes.body._id);
                (dealUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Deals if not signed in', function (done) {
    // Create new Deal model instance
    var dealObj = new Deal(deal);

    // Save the deal
    dealObj.save(function () {
      // Request Deals
      request(app).get('/api/deals')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Deal if not signed in', function (done) {
    // Create new Deal model instance
    var dealObj = new Deal(deal);

    // Save the Deal
    dealObj.save(function () {
      request(app).get('/api/deals/' + dealObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', deal.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Deal with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/deals/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Deal is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Deal which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Deal
    request(app).get('/api/deals/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Deal with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Deal if signed in', function (done) {
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

        // Save a new Deal
        agent.post('/api/deals')
          .send(deal)
          .expect(200)
          .end(function (dealSaveErr, dealSaveRes) {
            // Handle Deal save error
            if (dealSaveErr) {
              return done(dealSaveErr);
            }

            // Delete an existing Deal
            agent.delete('/api/deals/' + dealSaveRes.body._id)
              .send(deal)
              .expect(200)
              .end(function (dealDeleteErr, dealDeleteRes) {
                // Handle deal error error
                if (dealDeleteErr) {
                  return done(dealDeleteErr);
                }

                // Set assertions
                (dealDeleteRes.body._id).should.equal(dealSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Deal if not signed in', function (done) {
    // Set Deal user
    deal.user = user;

    // Create new Deal model instance
    var dealObj = new Deal(deal);

    // Save the Deal
    dealObj.save(function () {
      // Try deleting Deal
      request(app).delete('/api/deals/' + dealObj._id)
        .expect(403)
        .end(function (dealDeleteErr, dealDeleteRes) {
          // Set message assertion
          (dealDeleteRes.body.message).should.match('User is not authorized');

          // Handle Deal error error
          done(dealDeleteErr);
        });

    });
  });

  it('should be able to get a single Deal that has an orphaned user reference', function (done) {
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

          // Save a new Deal
          agent.post('/api/deals')
            .send(deal)
            .expect(200)
            .end(function (dealSaveErr, dealSaveRes) {
              // Handle Deal save error
              if (dealSaveErr) {
                return done(dealSaveErr);
              }

              // Set assertions on new Deal
              (dealSaveRes.body.name).should.equal(deal.name);
              should.exist(dealSaveRes.body.user);
              should.equal(dealSaveRes.body.user._id, orphanId);

              // force the Deal to have an orphaned user reference
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

                    // Get the Deal
                    agent.get('/api/deals/' + dealSaveRes.body._id)
                      .expect(200)
                      .end(function (dealInfoErr, dealInfoRes) {
                        // Handle Deal error
                        if (dealInfoErr) {
                          return done(dealInfoErr);
                        }

                        // Set assertions
                        (dealInfoRes.body._id).should.equal(dealSaveRes.body._id);
                        (dealInfoRes.body.name).should.equal(deal.name);
                        should.equal(dealInfoRes.body.user, undefined);

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
      Deal.remove().exec(done);
    });
  });
});

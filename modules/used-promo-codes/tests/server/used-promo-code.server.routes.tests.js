'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  UsedPromoCode = mongoose.model('UsedPromoCode'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  usedPromoCode;

/**
 * Used promo code routes tests
 */
describe('Used promo code CRUD tests', function () {

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

    // Save a user to the test db and create new Used promo code
    user.save(function () {
      usedPromoCode = {
        name: 'Used promo code name'
      };

      done();
    });
  });

  it('should be able to save a Used promo code if logged in', function (done) {
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

        // Save a new Used promo code
        agent.post('/api/usedPromoCodes')
          .send(usedPromoCode)
          .expect(200)
          .end(function (usedPromoCodeSaveErr, usedPromoCodeSaveRes) {
            // Handle Used promo code save error
            if (usedPromoCodeSaveErr) {
              return done(usedPromoCodeSaveErr);
            }

            // Get a list of Used promo codes
            agent.get('/api/usedPromoCodes')
              .end(function (usedPromoCodesGetErr, usedPromoCodesGetRes) {
                // Handle Used promo codes save error
                if (usedPromoCodesGetErr) {
                  return done(usedPromoCodesGetErr);
                }

                // Get Used promo codes list
                var usedPromoCodes = usedPromoCodesGetRes.body;

                // Set assertions
                (usedPromoCodes[0].user._id).should.equal(userId);
                (usedPromoCodes[0].name).should.match('Used promo code name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Used promo code if not logged in', function (done) {
    agent.post('/api/usedPromoCodes')
      .send(usedPromoCode)
      .expect(403)
      .end(function (usedPromoCodeSaveErr, usedPromoCodeSaveRes) {
        // Call the assertion callback
        done(usedPromoCodeSaveErr);
      });
  });

  it('should not be able to save an Used promo code if no name is provided', function (done) {
    // Invalidate name field
    usedPromoCode.name = '';

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

        // Save a new Used promo code
        agent.post('/api/usedPromoCodes')
          .send(usedPromoCode)
          .expect(400)
          .end(function (usedPromoCodeSaveErr, usedPromoCodeSaveRes) {
            // Set message assertion
            (usedPromoCodeSaveRes.body.message).should.match('Please fill Used promo code name');

            // Handle Used promo code save error
            done(usedPromoCodeSaveErr);
          });
      });
  });

  it('should be able to update an Used promo code if signed in', function (done) {
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

        // Save a new Used promo code
        agent.post('/api/usedPromoCodes')
          .send(usedPromoCode)
          .expect(200)
          .end(function (usedPromoCodeSaveErr, usedPromoCodeSaveRes) {
            // Handle Used promo code save error
            if (usedPromoCodeSaveErr) {
              return done(usedPromoCodeSaveErr);
            }

            // Update Used promo code name
            usedPromoCode.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Used promo code
            agent.put('/api/usedPromoCodes/' + usedPromoCodeSaveRes.body._id)
              .send(usedPromoCode)
              .expect(200)
              .end(function (usedPromoCodeUpdateErr, usedPromoCodeUpdateRes) {
                // Handle Used promo code update error
                if (usedPromoCodeUpdateErr) {
                  return done(usedPromoCodeUpdateErr);
                }

                // Set assertions
                (usedPromoCodeUpdateRes.body._id).should.equal(usedPromoCodeSaveRes.body._id);
                (usedPromoCodeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Used promo codes if not signed in', function (done) {
    // Create new Used promo code model instance
    var usedPromoCodeObj = new UsedPromoCode(usedPromoCode);

    // Save the usedPromoCode
    usedPromoCodeObj.save(function () {
      // Request Used promo codes
      request(app).get('/api/usedPromoCodes')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Used promo code if not signed in', function (done) {
    // Create new Used promo code model instance
    var usedPromoCodeObj = new UsedPromoCode(usedPromoCode);

    // Save the Used promo code
    usedPromoCodeObj.save(function () {
      request(app).get('/api/usedPromoCodes/' + usedPromoCodeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', usedPromoCode.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Used promo code with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/usedPromoCodes/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Used promo code is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Used promo code which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Used promo code
    request(app).get('/api/usedPromoCodes/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Used promo code with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Used promo code if signed in', function (done) {
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

        // Save a new Used promo code
        agent.post('/api/usedPromoCodes')
          .send(usedPromoCode)
          .expect(200)
          .end(function (usedPromoCodeSaveErr, usedPromoCodeSaveRes) {
            // Handle Used promo code save error
            if (usedPromoCodeSaveErr) {
              return done(usedPromoCodeSaveErr);
            }

            // Delete an existing Used promo code
            agent.delete('/api/usedPromoCodes/' + usedPromoCodeSaveRes.body._id)
              .send(usedPromoCode)
              .expect(200)
              .end(function (usedPromoCodeDeleteErr, usedPromoCodeDeleteRes) {
                // Handle usedPromoCode error error
                if (usedPromoCodeDeleteErr) {
                  return done(usedPromoCodeDeleteErr);
                }

                // Set assertions
                (usedPromoCodeDeleteRes.body._id).should.equal(usedPromoCodeSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Used promo code if not signed in', function (done) {
    // Set Used promo code user
    usedPromoCode.user = user;

    // Create new Used promo code model instance
    var usedPromoCodeObj = new UsedPromoCode(usedPromoCode);

    // Save the Used promo code
    usedPromoCodeObj.save(function () {
      // Try deleting Used promo code
      request(app).delete('/api/usedPromoCodes/' + usedPromoCodeObj._id)
        .expect(403)
        .end(function (usedPromoCodeDeleteErr, usedPromoCodeDeleteRes) {
          // Set message assertion
          (usedPromoCodeDeleteRes.body.message).should.match('User is not authorized');

          // Handle Used promo code error error
          done(usedPromoCodeDeleteErr);
        });

    });
  });

  it('should be able to get a single Used promo code that has an orphaned user reference', function (done) {
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

          // Save a new Used promo code
          agent.post('/api/usedPromoCodes')
            .send(usedPromoCode)
            .expect(200)
            .end(function (usedPromoCodeSaveErr, usedPromoCodeSaveRes) {
              // Handle Used promo code save error
              if (usedPromoCodeSaveErr) {
                return done(usedPromoCodeSaveErr);
              }

              // Set assertions on new Used promo code
              (usedPromoCodeSaveRes.body.name).should.equal(usedPromoCode.name);
              should.exist(usedPromoCodeSaveRes.body.user);
              should.equal(usedPromoCodeSaveRes.body.user._id, orphanId);

              // force the Used promo code to have an orphaned user reference
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

                    // Get the Used promo code
                    agent.get('/api/usedPromoCodes/' + usedPromoCodeSaveRes.body._id)
                      .expect(200)
                      .end(function (usedPromoCodeInfoErr, usedPromoCodeInfoRes) {
                        // Handle Used promo code error
                        if (usedPromoCodeInfoErr) {
                          return done(usedPromoCodeInfoErr);
                        }

                        // Set assertions
                        (usedPromoCodeInfoRes.body._id).should.equal(usedPromoCodeSaveRes.body._id);
                        (usedPromoCodeInfoRes.body.name).should.equal(usedPromoCode.name);
                        should.equal(usedPromoCodeInfoRes.body.user, undefined);

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
      UsedPromoCode.remove().exec(done);
    });
  });
});

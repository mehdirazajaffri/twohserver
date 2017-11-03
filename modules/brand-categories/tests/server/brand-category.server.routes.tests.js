'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  BrandCategory = mongoose.model('BrandCategory'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  brandCategory;

/**
 * Brand category routes tests
 */
describe('Brand category CRUD tests', function () {

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

    // Save a user to the test db and create new Brand category
    user.save(function () {
      brandCategory = {
        name: 'Brand category name'
      };

      done();
    });
  });

  it('should be able to save a Brand category if logged in', function (done) {
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

        // Save a new Brand category
        agent.post('/api/brandCategories')
          .send(brandCategory)
          .expect(200)
          .end(function (brandCategorySaveErr, brandCategorySaveRes) {
            // Handle Brand category save error
            if (brandCategorySaveErr) {
              return done(brandCategorySaveErr);
            }

            // Get a list of Brand categories
            agent.get('/api/brandCategories')
              .end(function (brandCategoriesGetErr, brandCategoriesGetRes) {
                // Handle Brand categories save error
                if (brandCategoriesGetErr) {
                  return done(brandCategoriesGetErr);
                }

                // Get Brand categories list
                var brandCategories = brandCategoriesGetRes.body;

                // Set assertions
                (brandCategories[0].user._id).should.equal(userId);
                (brandCategories[0].name).should.match('Brand category name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Brand category if not logged in', function (done) {
    agent.post('/api/brandCategories')
      .send(brandCategory)
      .expect(403)
      .end(function (brandCategorySaveErr, brandCategorySaveRes) {
        // Call the assertion callback
        done(brandCategorySaveErr);
      });
  });

  it('should not be able to save an Brand category if no name is provided', function (done) {
    // Invalidate name field
    brandCategory.name = '';

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

        // Save a new Brand category
        agent.post('/api/brandCategories')
          .send(brandCategory)
          .expect(400)
          .end(function (brandCategorySaveErr, brandCategorySaveRes) {
            // Set message assertion
            (brandCategorySaveRes.body.message).should.match('Please fill Brand category name');

            // Handle Brand category save error
            done(brandCategorySaveErr);
          });
      });
  });

  it('should be able to update an Brand category if signed in', function (done) {
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

        // Save a new Brand category
        agent.post('/api/brandCategories')
          .send(brandCategory)
          .expect(200)
          .end(function (brandCategorySaveErr, brandCategorySaveRes) {
            // Handle Brand category save error
            if (brandCategorySaveErr) {
              return done(brandCategorySaveErr);
            }

            // Update Brand category name
            brandCategory.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Brand category
            agent.put('/api/brandCategories/' + brandCategorySaveRes.body._id)
              .send(brandCategory)
              .expect(200)
              .end(function (brandCategoryUpdateErr, brandCategoryUpdateRes) {
                // Handle Brand category update error
                if (brandCategoryUpdateErr) {
                  return done(brandCategoryUpdateErr);
                }

                // Set assertions
                (brandCategoryUpdateRes.body._id).should.equal(brandCategorySaveRes.body._id);
                (brandCategoryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Brand categories if not signed in', function (done) {
    // Create new Brand category model instance
    var brandCategoryObj = new BrandCategory(brandCategory);

    // Save the brandCategory
    brandCategoryObj.save(function () {
      // Request Brand categories
      request(app).get('/api/brandCategories')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Brand category if not signed in', function (done) {
    // Create new Brand category model instance
    var brandCategoryObj = new BrandCategory(brandCategory);

    // Save the Brand category
    brandCategoryObj.save(function () {
      request(app).get('/api/brandCategories/' + brandCategoryObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', brandCategory.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Brand category with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/brandCategories/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Brand category is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Brand category which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Brand category
    request(app).get('/api/brandCategories/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Brand category with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Brand category if signed in', function (done) {
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

        // Save a new Brand category
        agent.post('/api/brandCategories')
          .send(brandCategory)
          .expect(200)
          .end(function (brandCategorySaveErr, brandCategorySaveRes) {
            // Handle Brand category save error
            if (brandCategorySaveErr) {
              return done(brandCategorySaveErr);
            }

            // Delete an existing Brand category
            agent.delete('/api/brandCategories/' + brandCategorySaveRes.body._id)
              .send(brandCategory)
              .expect(200)
              .end(function (brandCategoryDeleteErr, brandCategoryDeleteRes) {
                // Handle brandCategory error error
                if (brandCategoryDeleteErr) {
                  return done(brandCategoryDeleteErr);
                }

                // Set assertions
                (brandCategoryDeleteRes.body._id).should.equal(brandCategorySaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Brand category if not signed in', function (done) {
    // Set Brand category user
    brandCategory.user = user;

    // Create new Brand category model instance
    var brandCategoryObj = new BrandCategory(brandCategory);

    // Save the Brand category
    brandCategoryObj.save(function () {
      // Try deleting Brand category
      request(app).delete('/api/brandCategories/' + brandCategoryObj._id)
        .expect(403)
        .end(function (brandCategoryDeleteErr, brandCategoryDeleteRes) {
          // Set message assertion
          (brandCategoryDeleteRes.body.message).should.match('User is not authorized');

          // Handle Brand category error error
          done(brandCategoryDeleteErr);
        });

    });
  });

  it('should be able to get a single Brand category that has an orphaned user reference', function (done) {
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

          // Save a new Brand category
          agent.post('/api/brandCategories')
            .send(brandCategory)
            .expect(200)
            .end(function (brandCategorySaveErr, brandCategorySaveRes) {
              // Handle Brand category save error
              if (brandCategorySaveErr) {
                return done(brandCategorySaveErr);
              }

              // Set assertions on new Brand category
              (brandCategorySaveRes.body.name).should.equal(brandCategory.name);
              should.exist(brandCategorySaveRes.body.user);
              should.equal(brandCategorySaveRes.body.user._id, orphanId);

              // force the Brand category to have an orphaned user reference
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

                    // Get the Brand category
                    agent.get('/api/brandCategories/' + brandCategorySaveRes.body._id)
                      .expect(200)
                      .end(function (brandCategoryInfoErr, brandCategoryInfoRes) {
                        // Handle Brand category error
                        if (brandCategoryInfoErr) {
                          return done(brandCategoryInfoErr);
                        }

                        // Set assertions
                        (brandCategoryInfoRes.body._id).should.equal(brandCategorySaveRes.body._id);
                        (brandCategoryInfoRes.body.name).should.equal(brandCategory.name);
                        should.equal(brandCategoryInfoRes.body.user, undefined);

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
      BrandCategory.remove().exec(done);
    });
  });
});

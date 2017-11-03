'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  BrandCategory = mongoose.model('BrandCategory');

/**
 * Globals
 */
var user,
  brandCategory;

/**
 * Unit tests
 */
describe('Brand category Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      brandCategory = new BrandCategory({
        name: 'Brand category Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return brandCategory.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      brandCategory.name = '';

      return brandCategory.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    BrandCategory.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});

'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  UsedPromoCode = mongoose.model('UsedPromoCode');

/**
 * Globals
 */
var user,
  usedPromoCode;

/**
 * Unit tests
 */
describe('Used promo code Model Unit Tests:', function() {
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
      usedPromoCode = new UsedPromoCode({
        name: 'Used promo code Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return usedPromoCode.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      usedPromoCode.name = '';

      return usedPromoCode.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    UsedPromoCode.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});

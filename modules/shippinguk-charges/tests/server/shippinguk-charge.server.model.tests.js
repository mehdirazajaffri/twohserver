'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  ShippingukCharge = mongoose.model('ShippingukCharge');

/**
 * Globals
 */
var user,
  shippingukCharge;

/**
 * Unit tests
 */
describe('Shippinguk charge Model Unit Tests:', function() {
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
      shippingukCharge = new ShippingukCharge({
        name: 'Shippinguk charge Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return shippingukCharge.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      shippingukCharge.name = '';

      return shippingukCharge.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    ShippingukCharge.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});

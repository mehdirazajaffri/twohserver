'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  DeliveryukCharge = mongoose.model('DeliveryukCharge');

/**
 * Globals
 */
var user,
  deliveryukCharge;

/**
 * Unit tests
 */
describe('Deliveryuk charge Model Unit Tests:', function() {
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
      deliveryukCharge = new DeliveryukCharge({
        name: 'Deliveryuk charge Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return deliveryukCharge.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      deliveryukCharge.name = '';

      return deliveryukCharge.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    DeliveryukCharge.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});

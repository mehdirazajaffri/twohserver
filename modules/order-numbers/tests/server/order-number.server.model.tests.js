'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  OrderNumber = mongoose.model('OrderNumber');

/**
 * Globals
 */
var user,
  orderNumber;

/**
 * Unit tests
 */
describe('Order number Model Unit Tests:', function() {
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
      orderNumber = new OrderNumber({
        name: 'Order number Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return orderNumber.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      orderNumber.name = '';

      return orderNumber.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    OrderNumber.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});

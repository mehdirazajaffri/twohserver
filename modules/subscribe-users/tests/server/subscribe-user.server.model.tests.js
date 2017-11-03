'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  SubscribeUser = mongoose.model('SubscribeUser');

/**
 * Globals
 */
var user,
  subscribeUser;

/**
 * Unit tests
 */
describe('Subscribe user Model Unit Tests:', function() {
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
      subscribeUser = new SubscribeUser({
        name: 'Subscribe user Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return subscribeUser.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      subscribeUser.name = '';

      return subscribeUser.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    SubscribeUser.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});

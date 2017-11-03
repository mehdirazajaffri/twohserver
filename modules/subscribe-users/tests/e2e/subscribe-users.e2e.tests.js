'use strict';

describe('Subscribe users E2E Tests:', function () {
  describe('Test Subscribe users page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/subscribe-users');
      expect(element.all(by.repeater('subscribe-user in subscribe-users')).count()).toEqual(0);
    });
  });
});

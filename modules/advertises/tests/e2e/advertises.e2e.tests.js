'use strict';

describe('Advertises E2E Tests:', function () {
  describe('Test Advertises page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/advertises');
      expect(element.all(by.repeater('advertise in advertises')).count()).toEqual(0);
    });
  });
});

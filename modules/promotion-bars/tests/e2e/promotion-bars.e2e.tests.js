'use strict';

describe('Promotion bars E2E Tests:', function () {
  describe('Test Promotion bars page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/promotion-bars');
      expect(element.all(by.repeater('promotion-bar in promotion-bars')).count()).toEqual(0);
    });
  });
});

'use strict';

describe('Used promo codes E2E Tests:', function () {
  describe('Test Used promo codes page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/used-promo-codes');
      expect(element.all(by.repeater('used-promo-code in used-promo-codes')).count()).toEqual(0);
    });
  });
});

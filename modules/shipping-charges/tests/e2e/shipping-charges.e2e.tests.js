'use strict';

describe('Shipping charges E2E Tests:', function () {
  describe('Test Shipping charges page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/shipping-charges');
      expect(element.all(by.repeater('shipping-charge in shipping-charges')).count()).toEqual(0);
    });
  });
});

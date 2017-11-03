'use strict';

describe('Shippinguk charges E2E Tests:', function () {
  describe('Test Shippinguk charges page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/shippinguk-charges');
      expect(element.all(by.repeater('shippinguk-charge in shippinguk-charges')).count()).toEqual(0);
    });
  });
});

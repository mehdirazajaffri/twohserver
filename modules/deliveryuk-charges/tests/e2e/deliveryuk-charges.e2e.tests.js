'use strict';

describe('Deliveryuk charges E2E Tests:', function () {
  describe('Test Deliveryuk charges page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/deliveryuk-charges');
      expect(element.all(by.repeater('deliveryuk-charge in deliveryuk-charges')).count()).toEqual(0);
    });
  });
});

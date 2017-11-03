'use strict';

describe('Delivery charges E2E Tests:', function () {
  describe('Test Delivery charges page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/delivery-charges');
      expect(element.all(by.repeater('delivery-charge in delivery-charges')).count()).toEqual(0);
    });
  });
});

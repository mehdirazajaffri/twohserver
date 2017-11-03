'use strict';

describe('Order numbers E2E Tests:', function () {
  describe('Test Order numbers page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/order-numbers');
      expect(element.all(by.repeater('order-number in order-numbers')).count()).toEqual(0);
    });
  });
});

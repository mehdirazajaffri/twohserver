'use strict';

describe('Ordersuks E2E Tests:', function () {
  describe('Test Ordersuks page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/ordersuks');
      expect(element.all(by.repeater('ordersuk in ordersuks')).count()).toEqual(0);
    });
  });
});

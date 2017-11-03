'use strict';

describe('Promos E2E Tests:', function () {
  describe('Test Promos page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/promos');
      expect(element.all(by.repeater('promo in promos')).count()).toEqual(0);
    });
  });
});

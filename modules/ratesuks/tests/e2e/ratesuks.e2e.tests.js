'use strict';

describe('Ratesuks E2E Tests:', function () {
  describe('Test Ratesuks page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/ratesuks');
      expect(element.all(by.repeater('ratesuk in ratesuks')).count()).toEqual(0);
    });
  });
});

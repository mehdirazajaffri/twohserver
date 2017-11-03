'use strict';

describe('Rates E2E Tests:', function () {
  describe('Test Rates page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/rates');
      expect(element.all(by.repeater('rate in rates')).count()).toEqual(0);
    });
  });
});

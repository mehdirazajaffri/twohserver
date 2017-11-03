'use strict';

describe('Brandsuks E2E Tests:', function () {
  describe('Test Brandsuks page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/brandsuks');
      expect(element.all(by.repeater('brandsuk in brandsuks')).count()).toEqual(0);
    });
  });
});

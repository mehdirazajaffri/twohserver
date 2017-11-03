'use strict';

describe('Deals E2E Tests:', function () {
  describe('Test Deals page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/deals');
      expect(element.all(by.repeater('deal in deals')).count()).toEqual(0);
    });
  });
});

'use strict';

describe('Scrappers E2E Tests:', function () {
  describe('Test Scrappers page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/scrappers');
      expect(element.all(by.repeater('scrapper in scrappers')).count()).toEqual(0);
    });
  });
});

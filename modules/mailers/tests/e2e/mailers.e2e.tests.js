'use strict';

describe('Mailers E2E Tests:', function () {
  describe('Test Mailers page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/mailers');
      expect(element.all(by.repeater('mailer in mailers')).count()).toEqual(0);
    });
  });
});

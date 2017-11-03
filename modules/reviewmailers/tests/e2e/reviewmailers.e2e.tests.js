'use strict';

describe('Reviewmailers E2E Tests:', function () {
  describe('Test Reviewmailers page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/reviewmailers');
      expect(element.all(by.repeater('reviewmailer in reviewmailers')).count()).toEqual(0);
    });
  });
});

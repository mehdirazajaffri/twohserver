'use strict';

describe('Brand categories E2E Tests:', function () {
  describe('Test Brand categories page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/brand-categories');
      expect(element.all(by.repeater('brand-category in brand-categories')).count()).toEqual(0);
    });
  });
});

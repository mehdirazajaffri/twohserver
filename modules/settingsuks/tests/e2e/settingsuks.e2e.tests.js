'use strict';

describe('Settingsuks E2E Tests:', function () {
  describe('Test Settingsuks page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/settingsuks');
      expect(element.all(by.repeater('settingsuk in settingsuks')).count()).toEqual(0);
    });
  });
});

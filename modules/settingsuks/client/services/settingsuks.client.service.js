// Settingsuks service used to communicate Settingsuks REST endpoints
(function () {
  'use strict';

  angular
    .module('settingsuks')
    .factory('SettingsuksService', SettingsuksService);

  SettingsuksService.$inject = ['$resource'];

  function SettingsuksService($resource) {
    return $resource('api/settingsuks/:settingsukId', {
      settingsukId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());

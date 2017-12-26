(function () {
  'use strict';

  angular
    .module('settingsuks')
    .controller('SettingsuksListController', SettingsuksListController);

  SettingsuksListController.$inject = ['SettingsuksService'];

  function SettingsuksListController(SettingsuksService) {
    var vm = this;

    vm.settingsuks = SettingsuksService.query();
  }
}());

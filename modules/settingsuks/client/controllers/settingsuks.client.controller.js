(function () {
  'use strict';

  // Settingsuks controller
  angular
    .module('settingsuks')
    .controller('SettingsuksController', SettingsuksController);

  SettingsuksController.$inject = ['$scope', '$state', '$window', 'Authentication', 'settingsukResolve'];

  function SettingsuksController ($scope, $state, $window, Authentication, settingsuk) {
    var vm = this;

    vm.authentication = Authentication;
    vm.settingsuk = settingsuk;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Settingsuk
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.settingsuk.$remove($state.go('settingsuks.list'));
      }
    }

    // Save Settingsuk
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.settingsukForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.settingsuk._id) {
        vm.settingsuk.$update(successCallback, errorCallback);
      } else {
        vm.settingsuk.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('settingsuks.view', {
          settingsukId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

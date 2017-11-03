(function () {
  'use strict';

  // Ratesuks controller
  angular
    .module('ratesuks')
    .controller('RatesuksController', RatesuksController);

  RatesuksController.$inject = ['$scope', '$state', '$window', 'Authentication', 'ratesukResolve'];

  function RatesuksController ($scope, $state, $window, Authentication, ratesuk) {
    var vm = this;

    vm.authentication = Authentication;
    vm.ratesuk = ratesuk;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Ratesuk
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.ratesuk.$remove($state.go('ratesuks.list'));
      }
    }

    // Save Ratesuk
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.ratesukForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.ratesuk._id) {
        vm.ratesuk.$update(successCallback, errorCallback);
      } else {
        vm.ratesuk.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('ratesuks.view', {
          ratesukId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

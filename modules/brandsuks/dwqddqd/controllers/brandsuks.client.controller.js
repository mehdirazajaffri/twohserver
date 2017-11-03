(function () {
  'use strict';

  // Brandsuks controller
  angular
    .module('brandsuks')
    .controller('BrandsuksController', BrandsuksController);

  BrandsuksController.$inject = ['$scope', '$state', '$window', 'Authentication', 'brandsukResolve'];

  function BrandsuksController ($scope, $state, $window, Authentication, brandsuk) {
    var vm = this;

    vm.authentication = Authentication;
    vm.brandsuk = brandsuk;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Brandsuk
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.brandsuk.$remove($state.go('brandsuks.list'));
      }
    }

    // Save Brandsuk
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.brandsukForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.brandsuk._id) {
        vm.brandsuk.$update(successCallback, errorCallback);
      } else {
        vm.brandsuk.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('brandsuks.view', {
          brandsukId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

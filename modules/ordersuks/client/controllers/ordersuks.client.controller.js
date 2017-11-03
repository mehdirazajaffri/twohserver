(function () {
  'use strict';

  // Ordersuks controller
  angular
    .module('ordersuks')
    .controller('OrdersuksController', OrdersuksController);

  OrdersuksController.$inject = ['$scope', '$state', '$window', 'Authentication', 'ordersukResolve'];

  function OrdersuksController ($scope, $state, $window, Authentication, ordersuk) {
    var vm = this;

    vm.authentication = Authentication;
    vm.ordersuk = ordersuk;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Ordersuk
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.ordersuk.$remove($state.go('ordersuks.list'));
      }
    }

    // Save Ordersuk
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.ordersukForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.ordersuk._id) {
        vm.ordersuk.$update(successCallback, errorCallback);
      } else {
        vm.ordersuk.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('ordersuks.view', {
          ordersukId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

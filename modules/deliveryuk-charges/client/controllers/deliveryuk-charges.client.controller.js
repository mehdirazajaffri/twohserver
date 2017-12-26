(function () {
  'use strict';

  // Deliveryuk charges controller
  angular
    .module('deliveryuk-charges')
    .controller('DeliveryukChargesController', DeliveryukChargesController);

  DeliveryukChargesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'deliveryukChargeResolve'];

  function DeliveryukChargesController ($scope, $state, $window, Authentication, deliveryukCharge) {
    var vm = this;

    vm.authentication = Authentication;
    vm.deliveryukCharge = deliveryukCharge;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Deliveryuk charge
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.deliveryukCharge.$remove($state.go('deliveryuk-charges.list'));
      }
    }

    // Save Deliveryuk charge
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.deliveryukChargeForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.deliveryukCharge._id) {
        vm.deliveryukCharge.$update(successCallback, errorCallback);
      } else {
        vm.deliveryukCharge.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('deliveryuk-charges.view', {
          deliveryukChargeId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

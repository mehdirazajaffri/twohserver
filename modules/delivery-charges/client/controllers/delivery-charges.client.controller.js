(function () {
  'use strict';

  // Delivery charges controller
  angular
    .module('delivery-charges')
    .controller('DeliveryChargesController', DeliveryChargesController);

  DeliveryChargesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'deliveryChargeResolve'];

  function DeliveryChargesController ($scope, $state, $window, Authentication, deliveryCharge) {
    var vm = this;

    vm.authentication = Authentication;
    vm.deliveryCharge = deliveryCharge;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Delivery charge
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.deliveryCharge.$remove($state.go('delivery-charges.list'));
      }
    }

    // Save Delivery charge
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.deliveryChargeForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.deliveryCharge._id) {
        vm.deliveryCharge.$update(successCallback, errorCallback);
      } else {
        vm.deliveryCharge.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('delivery-charges.view', {
          deliveryChargeId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

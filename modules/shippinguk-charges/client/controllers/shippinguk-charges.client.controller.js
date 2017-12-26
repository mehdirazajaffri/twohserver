(function () {
  'use strict';

  // Shippinguk charges controller
  angular
    .module('shippinguk-charges')
    .controller('ShippingukChargesController', ShippingukChargesController);

  ShippingukChargesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'shippingukChargeResolve'];

  function ShippingukChargesController ($scope, $state, $window, Authentication, shippingukCharge) {
    var vm = this;

    vm.authentication = Authentication;
    vm.shippingukCharge = shippingukCharge;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Shippinguk charge
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.shippingukCharge.$remove($state.go('shippinguk-charges.list'));
      }
    }

    // Save Shippinguk charge
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.shippingukChargeForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.shippingukCharge._id) {
        vm.shippingukCharge.$update(successCallback, errorCallback);
      } else {
        vm.shippingukCharge.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('shippinguk-charges.view', {
          shippingukChargeId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

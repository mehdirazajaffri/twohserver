(function () {
  'use strict';

  angular
    .module('delivery-charges')
    .controller('DeliveryChargesListController', DeliveryChargesListController);

  DeliveryChargesListController.$inject = ['DeliveryChargesService'];

  function DeliveryChargesListController(DeliveryChargesService) {
    var vm = this;

    vm.deliveryCharges = DeliveryChargesService.query();
  }
}());

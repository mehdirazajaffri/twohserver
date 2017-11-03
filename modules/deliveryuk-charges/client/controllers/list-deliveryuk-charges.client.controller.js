(function () {
  'use strict';

  angular
    .module('deliveryuk-charges')
    .controller('DeliveryukChargesListController', DeliveryukChargesListController);

  DeliveryukChargesListController.$inject = ['DeliveryukChargesService'];

  function DeliveryukChargesListController(DeliveryukChargesService) {
    var vm = this;

    vm.deliveryukCharges = DeliveryukChargesService.query();
  }
}());

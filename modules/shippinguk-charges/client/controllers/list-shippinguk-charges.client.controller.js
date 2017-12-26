(function () {
  'use strict';

  angular
    .module('shippinguk-charges')
    .controller('ShippingukChargesListController', ShippingukChargesListController);

  ShippingukChargesListController.$inject = ['ShippingukChargesService'];

  function ShippingukChargesListController(ShippingukChargesService) {
    var vm = this;

    vm.shippingukCharges = ShippingukChargesService.query();
  }
}());

(function () {
  'use strict';

  angular
    .module('ordersuks')
    .controller('OrdersuksListController', OrdersuksListController);

  OrdersuksListController.$inject = ['OrdersuksService'];

  function OrdersuksListController(OrdersuksService) {
    var vm = this;

    vm.ordersuks = OrdersuksService.query();
  }
}());

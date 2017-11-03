(function () {
  'use strict';

  angular
    .module('ratesuks')
    .controller('RatesuksListController', RatesuksListController);

  RatesuksListController.$inject = ['RatesuksService'];

  function RatesuksListController(RatesuksService) {
    var vm = this;

    vm.ratesuks = RatesuksService.query();
  }
}());

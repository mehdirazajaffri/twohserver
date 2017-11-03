(function () {
  'use strict';

  angular
    .module('brandsuks')
    .controller('BrandsuksListController', BrandsuksListController);

  BrandsuksListController.$inject = ['BrandsuksService'];

  function BrandsuksListController(BrandsuksService) {
    var vm = this;

    vm.brandsuks = BrandsuksService.query();
  }
}());

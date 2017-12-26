(function () {
  'use strict';

  angular
    .module('scrappers')
    .controller('ScrappersListController', ScrappersListController);

  ScrappersListController.$inject = ['ScrappersService'];

  function ScrappersListController(ScrappersService) {
    var vm = this;

    vm.scrappers = ScrappersService.query();
  }
}());

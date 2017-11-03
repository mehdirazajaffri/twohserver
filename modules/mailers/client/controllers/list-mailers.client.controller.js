(function () {
  'use strict';

  angular
    .module('mailers')
    .controller('MailersListController', MailersListController);

  MailersListController.$inject = ['MailersService'];

  function MailersListController(MailersService) {
    var vm = this;

    vm.mailers = MailersService.query();
  }
}());

(function () {
  'use strict';

  angular
    .module('reviewmailers')
    .controller('ReviewmailersListController', ReviewmailersListController);

  ReviewmailersListController.$inject = ['ReviewmailersService'];

  function ReviewmailersListController(ReviewmailersService) {
    var vm = this;

    vm.reviewmailers = ReviewmailersService.query();
  }
}());

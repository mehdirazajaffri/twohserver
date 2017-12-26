(function () {
  'use strict';

  // Reviewmailers controller
  angular
    .module('reviewmailers')
    .controller('ReviewmailersController', ReviewmailersController);

  ReviewmailersController.$inject = ['$scope', '$state', '$window', 'Authentication', 'reviewmailerResolve'];

  function ReviewmailersController ($scope, $state, $window, Authentication, reviewmailer) {
    var vm = this;

    vm.authentication = Authentication;
    vm.reviewmailer = reviewmailer;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Reviewmailer
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.reviewmailer.$remove($state.go('reviewmailers.list'));
      }
    }

    // Save Reviewmailer
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.reviewmailerForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.reviewmailer._id) {
        vm.reviewmailer.$update(successCallback, errorCallback);
      } else {
        vm.reviewmailer.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('reviewmailers.view', {
          reviewmailerId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

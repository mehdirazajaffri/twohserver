(function () {
  'use strict';

  // Mailers controller
  angular
    .module('mailers')
    .controller('MailersController', MailersController);

  MailersController.$inject = ['$scope', '$state', '$window', 'Authentication', 'mailerResolve'];

  function MailersController ($scope, $state, $window, Authentication, mailer) {
    var vm = this;

    vm.authentication = Authentication;
    vm.mailer = mailer;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Mailer
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.mailer.$remove($state.go('mailers.list'));
      }
    }

    // Save Mailer
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.mailerForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.mailer._id) {
        vm.mailer.$update(successCallback, errorCallback);
      } else {
        vm.mailer.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('mailers.view', {
          mailerId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

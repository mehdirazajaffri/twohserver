(function () {
  'use strict';

  // Scrappers controller
  angular
    .module('scrappers')
    .controller('ScrappersController', ScrappersController);

  ScrappersController.$inject = ['$scope', '$state', '$window', 'Authentication', 'scrapperResolve'];

  function ScrappersController ($scope, $state, $window, Authentication, scrapper) {
    var vm = this;

    vm.authentication = Authentication;
    vm.scrapper = scrapper;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Scrapper
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.scrapper.$remove($state.go('scrappers.list'));
      }
    }

    // Save Scrapper
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.scrapperForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.scrapper._id) {
        vm.scrapper.$update(successCallback, errorCallback);
      } else {
        vm.scrapper.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('scrappers.view', {
          scrapperId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

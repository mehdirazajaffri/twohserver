(function () {
  'use strict';

  angular
    .module('brandsuks')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('brandsuks', {
        abstract: true,
        url: '/brandsuks',
        template: '<ui-view/>'
      })
      .state('brandsuks.list', {
        url: '',
        templateUrl: 'modules/brandsuks/client/views/list-brandsuks.client.view.html',
        controller: 'BrandsuksListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Brandsuks List'
        }
      })
      .state('brandsuks.create', {
        url: '/create',
        templateUrl: 'modules/brandsuks/client/views/form-brandsuk.client.view.html',
        controller: 'BrandsuksController',
        controllerAs: 'vm',
        resolve: {
          brandsukResolve: newBrandsuk
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Brandsuks Create'
        }
      })
      .state('brandsuks.edit', {
        url: '/:brandsukId/edit',
        templateUrl: 'modules/brandsuks/client/views/form-brandsuk.client.view.html',
        controller: 'BrandsuksController',
        controllerAs: 'vm',
        resolve: {
          brandsukResolve: getBrandsuk
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Brandsuk {{ brandsukResolve.name }}'
        }
      })
      .state('brandsuks.view', {
        url: '/:brandsukId',
        templateUrl: 'modules/brandsuks/client/views/view-brandsuk.client.view.html',
        controller: 'BrandsuksController',
        controllerAs: 'vm',
        resolve: {
          brandsukResolve: getBrandsuk
        },
        data: {
          pageTitle: 'Brandsuk {{ brandsukResolve.name }}'
        }
      });
  }

  getBrandsuk.$inject = ['$stateParams', 'BrandsuksService'];

  function getBrandsuk($stateParams, BrandsuksService) {
    return BrandsuksService.get({
      brandsukId: $stateParams.brandsukId
    }).$promise;
  }

  newBrandsuk.$inject = ['BrandsuksService'];

  function newBrandsuk(BrandsuksService) {
    return new BrandsuksService();
  }
}());

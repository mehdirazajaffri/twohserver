(function () {
  'use strict';

  angular
    .module('ratesuks')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('ratesuks', {
        abstract: true,
        url: '/ratesuks',
        template: '<ui-view/>'
      })
      .state('ratesuks.list', {
        url: '',
        templateUrl: 'modules/ratesuks/client/views/list-ratesuks.client.view.html',
        controller: 'RatesuksListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Ratesuks List'
        }
      })
      .state('ratesuks.create', {
        url: '/create',
        templateUrl: 'modules/ratesuks/client/views/form-ratesuk.client.view.html',
        controller: 'RatesuksController',
        controllerAs: 'vm',
        resolve: {
          ratesukResolve: newRatesuk
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Ratesuks Create'
        }
      })
      .state('ratesuks.edit', {
        url: '/:ratesukId/edit',
        templateUrl: 'modules/ratesuks/client/views/form-ratesuk.client.view.html',
        controller: 'RatesuksController',
        controllerAs: 'vm',
        resolve: {
          ratesukResolve: getRatesuk
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Ratesuk {{ ratesukResolve.name }}'
        }
      })
      .state('ratesuks.view', {
        url: '/:ratesukId',
        templateUrl: 'modules/ratesuks/client/views/view-ratesuk.client.view.html',
        controller: 'RatesuksController',
        controllerAs: 'vm',
        resolve: {
          ratesukResolve: getRatesuk
        },
        data: {
          pageTitle: 'Ratesuk {{ ratesukResolve.name }}'
        }
      });
  }

  getRatesuk.$inject = ['$stateParams', 'RatesuksService'];

  function getRatesuk($stateParams, RatesuksService) {
    return RatesuksService.get({
      ratesukId: $stateParams.ratesukId
    }).$promise;
  }

  newRatesuk.$inject = ['RatesuksService'];

  function newRatesuk(RatesuksService) {
    return new RatesuksService();
  }
}());

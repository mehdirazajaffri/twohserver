(function () {
  'use strict';

  angular
    .module('scrappers')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('scrappers', {
        abstract: true,
        url: '/scrappers',
        template: '<ui-view/>'
      })
      .state('scrappers.list', {
        url: '',
        templateUrl: 'modules/scrappers/client/views/list-scrappers.client.view.html',
        controller: 'ScrappersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Scrappers List'
        }
      })
      .state('scrappers.create', {
        url: '/create',
        templateUrl: 'modules/scrappers/client/views/form-scrapper.client.view.html',
        controller: 'ScrappersController',
        controllerAs: 'vm',
        resolve: {
          scrapperResolve: newScrapper
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Scrappers Create'
        }
      })
      .state('scrappers.edit', {
        url: '/:scrapperId/edit',
        templateUrl: 'modules/scrappers/client/views/form-scrapper.client.view.html',
        controller: 'ScrappersController',
        controllerAs: 'vm',
        resolve: {
          scrapperResolve: getScrapper
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Scrapper {{ scrapperResolve.name }}'
        }
      })
      .state('scrappers.view', {
        url: '/:scrapperId',
        templateUrl: 'modules/scrappers/client/views/view-scrapper.client.view.html',
        controller: 'ScrappersController',
        controllerAs: 'vm',
        resolve: {
          scrapperResolve: getScrapper
        },
        data: {
          pageTitle: 'Scrapper {{ scrapperResolve.name }}'
        }
      });
  }

  getScrapper.$inject = ['$stateParams', 'ScrappersService'];

  function getScrapper($stateParams, ScrappersService) {
    return ScrappersService.get({
      scrapperId: $stateParams.scrapperId
    }).$promise;
  }

  newScrapper.$inject = ['ScrappersService'];

  function newScrapper(ScrappersService) {
    return new ScrappersService();
  }
}());

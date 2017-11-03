(function () {
  'use strict';

  angular
    .module('settingsuks')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('settingsuks', {
        abstract: true,
        url: '/settingsuks',
        template: '<ui-view/>'
      })
      .state('settingsuks.list', {
        url: '',
        templateUrl: 'modules/settingsuks/client/views/list-settingsuks.client.view.html',
        controller: 'SettingsuksListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settingsuks List'
        }
      })
      .state('settingsuks.create', {
        url: '/create',
        templateUrl: 'modules/settingsuks/client/views/form-settingsuk.client.view.html',
        controller: 'SettingsuksController',
        controllerAs: 'vm',
        resolve: {
          settingsukResolve: newSettingsuk
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Settingsuks Create'
        }
      })
      .state('settingsuks.edit', {
        url: '/:settingsukId/edit',
        templateUrl: 'modules/settingsuks/client/views/form-settingsuk.client.view.html',
        controller: 'SettingsuksController',
        controllerAs: 'vm',
        resolve: {
          settingsukResolve: getSettingsuk
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Settingsuk {{ settingsukResolve.name }}'
        }
      })
      .state('settingsuks.view', {
        url: '/:settingsukId',
        templateUrl: 'modules/settingsuks/client/views/view-settingsuk.client.view.html',
        controller: 'SettingsuksController',
        controllerAs: 'vm',
        resolve: {
          settingsukResolve: getSettingsuk
        },
        data: {
          pageTitle: 'Settingsuk {{ settingsukResolve.name }}'
        }
      });
  }

  getSettingsuk.$inject = ['$stateParams', 'SettingsuksService'];

  function getSettingsuk($stateParams, SettingsuksService) {
    return SettingsuksService.get({
      settingsukId: $stateParams.settingsukId
    }).$promise;
  }

  newSettingsuk.$inject = ['SettingsuksService'];

  function newSettingsuk(SettingsuksService) {
    return new SettingsuksService();
  }
}());

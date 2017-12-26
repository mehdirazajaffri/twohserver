(function () {
  'use strict';

  angular
    .module('mailers')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('mailers', {
        abstract: true,
        url: '/mailers',
        template: '<ui-view/>'
      })
      .state('mailers.list', {
        url: '',
        templateUrl: 'modules/mailers/client/views/list-mailers.client.view.html',
        controller: 'MailersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Mailers List'
        }
      })
      .state('mailers.create', {
        url: '/create',
        templateUrl: 'modules/mailers/client/views/form-mailer.client.view.html',
        controller: 'MailersController',
        controllerAs: 'vm',
        resolve: {
          mailerResolve: newMailer
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Mailers Create'
        }
      })
      .state('mailers.edit', {
        url: '/:mailerId/edit',
        templateUrl: 'modules/mailers/client/views/form-mailer.client.view.html',
        controller: 'MailersController',
        controllerAs: 'vm',
        resolve: {
          mailerResolve: getMailer
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Mailer {{ mailerResolve.name }}'
        }
      })
      .state('mailers.view', {
        url: '/:mailerId',
        templateUrl: 'modules/mailers/client/views/view-mailer.client.view.html',
        controller: 'MailersController',
        controllerAs: 'vm',
        resolve: {
          mailerResolve: getMailer
        },
        data: {
          pageTitle: 'Mailer {{ mailerResolve.name }}'
        }
      });
  }

  getMailer.$inject = ['$stateParams', 'MailersService'];

  function getMailer($stateParams, MailersService) {
    return MailersService.get({
      mailerId: $stateParams.mailerId
    }).$promise;
  }

  newMailer.$inject = ['MailersService'];

  function newMailer(MailersService) {
    return new MailersService();
  }
}());

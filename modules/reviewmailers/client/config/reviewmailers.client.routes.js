(function () {
  'use strict';

  angular
    .module('reviewmailers')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('reviewmailers', {
        abstract: true,
        url: '/reviewmailers',
        template: '<ui-view/>'
      })
      .state('reviewmailers.list', {
        url: '',
        templateUrl: 'modules/reviewmailers/client/views/list-reviewmailers.client.view.html',
        controller: 'ReviewmailersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Reviewmailers List'
        }
      })
      .state('reviewmailers.create', {
        url: '/create',
        templateUrl: 'modules/reviewmailers/client/views/form-reviewmailer.client.view.html',
        controller: 'ReviewmailersController',
        controllerAs: 'vm',
        resolve: {
          reviewmailerResolve: newReviewmailer
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Reviewmailers Create'
        }
      })
      .state('reviewmailers.edit', {
        url: '/:reviewmailerId/edit',
        templateUrl: 'modules/reviewmailers/client/views/form-reviewmailer.client.view.html',
        controller: 'ReviewmailersController',
        controllerAs: 'vm',
        resolve: {
          reviewmailerResolve: getReviewmailer
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Reviewmailer {{ reviewmailerResolve.name }}'
        }
      })
      .state('reviewmailers.view', {
        url: '/:reviewmailerId',
        templateUrl: 'modules/reviewmailers/client/views/view-reviewmailer.client.view.html',
        controller: 'ReviewmailersController',
        controllerAs: 'vm',
        resolve: {
          reviewmailerResolve: getReviewmailer
        },
        data: {
          pageTitle: 'Reviewmailer {{ reviewmailerResolve.name }}'
        }
      });
  }

  getReviewmailer.$inject = ['$stateParams', 'ReviewmailersService'];

  function getReviewmailer($stateParams, ReviewmailersService) {
    return ReviewmailersService.get({
      reviewmailerId: $stateParams.reviewmailerId
    }).$promise;
  }

  newReviewmailer.$inject = ['ReviewmailersService'];

  function newReviewmailer(ReviewmailersService) {
    return new ReviewmailersService();
  }
}());

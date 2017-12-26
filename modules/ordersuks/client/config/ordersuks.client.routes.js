(function () {
  'use strict';

  angular
    .module('ordersuks')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('ordersuks', {
        abstract: true,
        url: '/ordersuks',
        template: '<ui-view/>'
      })
      .state('ordersuks.list', {
        url: '',
        templateUrl: 'modules/ordersuks/client/views/list-ordersuks.client.view.html',
        controller: 'OrdersuksListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Ordersuks List'
        }
      })
      .state('ordersuks.create', {
        url: '/create',
        templateUrl: 'modules/ordersuks/client/views/form-ordersuk.client.view.html',
        controller: 'OrdersuksController',
        controllerAs: 'vm',
        resolve: {
          ordersukResolve: newOrdersuk
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Ordersuks Create'
        }
      })
      .state('ordersuks.edit', {
        url: '/:ordersukId/edit',
        templateUrl: 'modules/ordersuks/client/views/form-ordersuk.client.view.html',
        controller: 'OrdersuksController',
        controllerAs: 'vm',
        resolve: {
          ordersukResolve: getOrdersuk
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Ordersuk {{ ordersukResolve.name }}'
        }
      })
      .state('ordersuks.view', {
        url: '/:ordersukId',
        templateUrl: 'modules/ordersuks/client/views/view-ordersuk.client.view.html',
        controller: 'OrdersuksController',
        controllerAs: 'vm',
        resolve: {
          ordersukResolve: getOrdersuk
        },
        data: {
          pageTitle: 'Ordersuk {{ ordersukResolve.name }}'
        }
      });
  }

  getOrdersuk.$inject = ['$stateParams', 'OrdersuksService'];

  function getOrdersuk($stateParams, OrdersuksService) {
    return OrdersuksService.get({
      ordersukId: $stateParams.ordersukId
    }).$promise;
  }

  newOrdersuk.$inject = ['OrdersuksService'];

  function newOrdersuk(OrdersuksService) {
    return new OrdersuksService();
  }
}());

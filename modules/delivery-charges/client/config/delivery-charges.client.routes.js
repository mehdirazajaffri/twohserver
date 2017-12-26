(function () {
  'use strict';

  angular
    .module('delivery-charges')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('delivery-charges', {
        abstract: true,
        url: '/delivery-charges',
        template: '<ui-view/>'
      })
      .state('delivery-charges.list', {
        url: '',
        templateUrl: 'modules/delivery-charges/client/views/list-delivery-charges.client.view.html',
        controller: 'DeliveryChargesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Delivery charges List'
        }
      })
      .state('delivery-charges.create', {
        url: '/create',
        templateUrl: 'modules/delivery-charges/client/views/form-delivery-charge.client.view.html',
        controller: 'DeliveryChargesController',
        controllerAs: 'vm',
        resolve: {
          delivery-chargeResolve: newDeliveryCharge
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Delivery charges Create'
        }
      })
      .state('delivery-charges.edit', {
        url: '/:deliveryChargeId/edit',
        templateUrl: 'modules/delivery-charges/client/views/form-delivery-charge.client.view.html',
        controller: 'DeliveryChargesController',
        controllerAs: 'vm',
        resolve: {
          delivery-chargeResolve: getDeliveryCharge
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Delivery charge {{ delivery-chargeResolve.name }}'
        }
      })
      .state('delivery-charges.view', {
        url: '/:deliveryChargeId',
        templateUrl: 'modules/delivery-charges/client/views/view-delivery-charge.client.view.html',
        controller: 'DeliveryChargesController',
        controllerAs: 'vm',
        resolve: {
          delivery-chargeResolve: getDeliveryCharge
        },
        data: {
          pageTitle: 'Delivery charge {{ delivery-chargeResolve.name }}'
        }
      });
  }

  getDeliveryCharge.$inject = ['$stateParams', 'DeliveryChargesService'];

  function getDeliveryCharge($stateParams, DeliveryChargesService) {
    return DeliveryChargesService.get({
      deliveryChargeId: $stateParams.deliveryChargeId
    }).$promise;
  }

  newDeliveryCharge.$inject = ['DeliveryChargesService'];

  function newDeliveryCharge(DeliveryChargesService) {
    return new DeliveryChargesService();
  }
}());

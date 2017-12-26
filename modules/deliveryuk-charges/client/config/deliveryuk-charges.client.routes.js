(function () {
  'use strict';

  angular
    .module('deliveryuk-charges')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('deliveryuk-charges', {
        abstract: true,
        url: '/deliveryuk-charges',
        template: '<ui-view/>'
      })
      .state('deliveryuk-charges.list', {
        url: '',
        templateUrl: 'modules/deliveryuk-charges/client/views/list-deliveryuk-charges.client.view.html',
        controller: 'DeliveryukChargesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Deliveryuk charges List'
        }
      })
      .state('deliveryuk-charges.create', {
        url: '/create',
        templateUrl: 'modules/deliveryuk-charges/client/views/form-deliveryuk-charge.client.view.html',
        controller: 'DeliveryukChargesController',
        controllerAs: 'vm',
        resolve: {
          deliveryuk-chargeResolve: newDeliveryukCharge
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Deliveryuk charges Create'
        }
      })
      .state('deliveryuk-charges.edit', {
        url: '/:deliveryukChargeId/edit',
        templateUrl: 'modules/deliveryuk-charges/client/views/form-deliveryuk-charge.client.view.html',
        controller: 'DeliveryukChargesController',
        controllerAs: 'vm',
        resolve: {
          deliveryuk-chargeResolve: getDeliveryukCharge
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Deliveryuk charge {{ deliveryuk-chargeResolve.name }}'
        }
      })
      .state('deliveryuk-charges.view', {
        url: '/:deliveryukChargeId',
        templateUrl: 'modules/deliveryuk-charges/client/views/view-deliveryuk-charge.client.view.html',
        controller: 'DeliveryukChargesController',
        controllerAs: 'vm',
        resolve: {
          deliveryuk-chargeResolve: getDeliveryukCharge
        },
        data: {
          pageTitle: 'Deliveryuk charge {{ deliveryuk-chargeResolve.name }}'
        }
      });
  }

  getDeliveryukCharge.$inject = ['$stateParams', 'DeliveryukChargesService'];

  function getDeliveryukCharge($stateParams, DeliveryukChargesService) {
    return DeliveryukChargesService.get({
      deliveryukChargeId: $stateParams.deliveryukChargeId
    }).$promise;
  }

  newDeliveryukCharge.$inject = ['DeliveryukChargesService'];

  function newDeliveryukCharge(DeliveryukChargesService) {
    return new DeliveryukChargesService();
  }
}());

(function () {
  'use strict';

  angular
    .module('shippinguk-charges')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('shippinguk-charges', {
        abstract: true,
        url: '/shippinguk-charges',
        template: '<ui-view/>'
      })
      .state('shippinguk-charges.list', {
        url: '',
        templateUrl: 'modules/shippinguk-charges/client/views/list-shippinguk-charges.client.view.html',
        controller: 'ShippingukChargesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Shippinguk charges List'
        }
      })
      .state('shippinguk-charges.create', {
        url: '/create',
        templateUrl: 'modules/shippinguk-charges/client/views/form-shippinguk-charge.client.view.html',
        controller: 'ShippingukChargesController',
        controllerAs: 'vm',
        resolve: {
          shippinguk-chargeResolve: newShippingukCharge
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Shippinguk charges Create'
        }
      })
      .state('shippinguk-charges.edit', {
        url: '/:shippingukChargeId/edit',
        templateUrl: 'modules/shippinguk-charges/client/views/form-shippinguk-charge.client.view.html',
        controller: 'ShippingukChargesController',
        controllerAs: 'vm',
        resolve: {
          shippinguk-chargeResolve: getShippingukCharge
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Shippinguk charge {{ shippinguk-chargeResolve.name }}'
        }
      })
      .state('shippinguk-charges.view', {
        url: '/:shippingukChargeId',
        templateUrl: 'modules/shippinguk-charges/client/views/view-shippinguk-charge.client.view.html',
        controller: 'ShippingukChargesController',
        controllerAs: 'vm',
        resolve: {
          shippinguk-chargeResolve: getShippingukCharge
        },
        data: {
          pageTitle: 'Shippinguk charge {{ shippinguk-chargeResolve.name }}'
        }
      });
  }

  getShippingukCharge.$inject = ['$stateParams', 'ShippingukChargesService'];

  function getShippingukCharge($stateParams, ShippingukChargesService) {
    return ShippingukChargesService.get({
      shippingukChargeId: $stateParams.shippingukChargeId
    }).$promise;
  }

  newShippingukCharge.$inject = ['ShippingukChargesService'];

  function newShippingukCharge(ShippingukChargesService) {
    return new ShippingukChargesService();
  }
}());

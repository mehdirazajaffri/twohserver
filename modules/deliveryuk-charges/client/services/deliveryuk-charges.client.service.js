// Deliveryuk charges service used to communicate Deliveryuk charges REST endpoints
(function () {
  'use strict';

  angular
    .module('deliveryuk-charges')
    .factory('DeliveryukChargesService', DeliveryukChargesService);

  DeliveryukChargesService.$inject = ['$resource'];

  function DeliveryukChargesService($resource) {
    return $resource('api/deliveryuk-charges/:deliveryukChargeId', {
      deliveryukChargeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());

// Delivery charges service used to communicate Delivery charges REST endpoints
(function () {
  'use strict';

  angular
    .module('delivery-charges')
    .factory('DeliveryChargesService', DeliveryChargesService);

  DeliveryChargesService.$inject = ['$resource'];

  function DeliveryChargesService($resource) {
    return $resource('api/delivery-charges/:deliveryChargeId', {
      deliveryChargeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());

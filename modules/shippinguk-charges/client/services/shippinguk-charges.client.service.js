// Shippinguk charges service used to communicate Shippinguk charges REST endpoints
(function () {
  'use strict';

  angular
    .module('shippinguk-charges')
    .factory('ShippingukChargesService', ShippingukChargesService);

  ShippingukChargesService.$inject = ['$resource'];

  function ShippingukChargesService($resource) {
    return $resource('api/shippinguk-charges/:shippingukChargeId', {
      shippingukChargeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());

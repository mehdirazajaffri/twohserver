// Ordersuks service used to communicate Ordersuks REST endpoints
(function () {
  'use strict';

  angular
    .module('ordersuks')
    .factory('OrdersuksService', OrdersuksService);

  OrdersuksService.$inject = ['$resource'];

  function OrdersuksService($resource) {
    return $resource('api/ordersuks/:ordersukId', {
      ordersukId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());

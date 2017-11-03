// Ratesuks service used to communicate Ratesuks REST endpoints
(function () {
  'use strict';

  angular
    .module('ratesuks')
    .factory('RatesuksService', RatesuksService);

  RatesuksService.$inject = ['$resource'];

  function RatesuksService($resource) {
    return $resource('api/ratesuks/:ratesukId', {
      ratesukId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());

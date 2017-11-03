// Brandsuks service used to communicate Brandsuks REST endpoints
(function () {
  'use strict';

  angular
    .module('brandsuks')
    .factory('BrandsuksService', BrandsuksService);

  BrandsuksService.$inject = ['$resource'];

  function BrandsuksService($resource) {
    return $resource('api/brandsuks/:brandsukId', {
      brandsukId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());

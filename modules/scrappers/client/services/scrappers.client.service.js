// Scrappers service used to communicate Scrappers REST endpoints
(function () {
  'use strict';

  angular
    .module('scrappers')
    .factory('ScrappersService', ScrappersService);

  ScrappersService.$inject = ['$resource'];

  function ScrappersService($resource) {
    return $resource('api/scrappers/:scrapperId', {
      scrapperId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());

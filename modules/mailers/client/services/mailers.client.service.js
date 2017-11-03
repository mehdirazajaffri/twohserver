// Mailers service used to communicate Mailers REST endpoints
(function () {
  'use strict';

  angular
    .module('mailers')
    .factory('MailersService', MailersService);

  MailersService.$inject = ['$resource'];

  function MailersService($resource) {
    return $resource('api/mailers/:mailerId', {
      mailerId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());

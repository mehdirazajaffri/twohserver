// Reviewmailers service used to communicate Reviewmailers REST endpoints
(function () {
  'use strict';

  angular
    .module('reviewmailers')
    .factory('ReviewmailersService', ReviewmailersService);

  ReviewmailersService.$inject = ['$resource'];

  function ReviewmailersService($resource) {
    return $resource('api/reviewmailers/:reviewmailerId', {
      reviewmailerId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());

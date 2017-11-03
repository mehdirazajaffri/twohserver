(function () {
  'use strict';

  describe('Deliveryuk charges List Controller Tests', function () {
    // Initialize global variables
    var DeliveryukChargesListController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      DeliveryukChargesService,
      mockDeliveryukCharge;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _DeliveryukChargesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      DeliveryukChargesService = _DeliveryukChargesService_;

      // create mock article
      mockDeliveryukCharge = new DeliveryukChargesService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Deliveryuk charge Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Deliveryuk charges List controller.
      DeliveryukChargesListController = $controller('DeliveryukChargesListController as vm', {
        $scope: $scope
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockDeliveryukChargeList;

      beforeEach(function () {
        mockDeliveryukChargeList = [mockDeliveryukCharge, mockDeliveryukCharge];
      });

      it('should send a GET request and return all Deliveryuk charges', inject(function (DeliveryukChargesService) {
        // Set POST response
        $httpBackend.expectGET('api/deliveryuk-charges').respond(mockDeliveryukChargeList);


        $httpBackend.flush();

        // Test form inputs are reset
        expect($scope.vm.deliveryukCharges.length).toEqual(2);
        expect($scope.vm.deliveryukCharges[0]).toEqual(mockDeliveryukCharge);
        expect($scope.vm.deliveryukCharges[1]).toEqual(mockDeliveryukCharge);

      }));
    });
  });
}());

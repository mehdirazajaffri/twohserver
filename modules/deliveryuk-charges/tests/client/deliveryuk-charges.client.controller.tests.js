(function () {
  'use strict';

  describe('Deliveryuk charges Controller Tests', function () {
    // Initialize global variables
    var DeliveryukChargesController,
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

      // create mock Deliveryuk charge
      mockDeliveryukCharge = new DeliveryukChargesService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Deliveryuk charge Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Deliveryuk charges controller.
      DeliveryukChargesController = $controller('Deliveryuk chargesController as vm', {
        $scope: $scope,
        deliveryukChargeResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleDeliveryukChargePostData;

      beforeEach(function () {
        // Create a sample Deliveryuk charge object
        sampleDeliveryukChargePostData = new DeliveryukChargesService({
          name: 'Deliveryuk charge Name'
        });

        $scope.vm.deliveryukCharge = sampleDeliveryukChargePostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (DeliveryukChargesService) {
        // Set POST response
        $httpBackend.expectPOST('api/deliveryuk-charges', sampleDeliveryukChargePostData).respond(mockDeliveryukCharge);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Deliveryuk charge was created
        expect($state.go).toHaveBeenCalledWith('deliveryuk-charges.view', {
          deliveryukChargeId: mockDeliveryukCharge._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/deliveryuk-charges', sampleDeliveryukChargePostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Deliveryuk charge in $scope
        $scope.vm.deliveryukCharge = mockDeliveryukCharge;
      });

      it('should update a valid Deliveryuk charge', inject(function (DeliveryukChargesService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/deliveryuk-charges\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('deliveryuk-charges.view', {
          deliveryukChargeId: mockDeliveryukCharge._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (DeliveryukChargesService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/deliveryuk-charges\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Deliveryuk charges
        $scope.vm.deliveryukCharge = mockDeliveryukCharge;
      });

      it('should delete the Deliveryuk charge and redirect to Deliveryuk charges', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/deliveryuk-charges\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('deliveryuk-charges.list');
      });

      it('should should not delete the Deliveryuk charge and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());

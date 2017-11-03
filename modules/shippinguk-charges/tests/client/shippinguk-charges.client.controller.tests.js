(function () {
  'use strict';

  describe('Shippinguk charges Controller Tests', function () {
    // Initialize global variables
    var ShippingukChargesController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      ShippingukChargesService,
      mockShippingukCharge;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _ShippingukChargesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      ShippingukChargesService = _ShippingukChargesService_;

      // create mock Shippinguk charge
      mockShippingukCharge = new ShippingukChargesService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Shippinguk charge Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Shippinguk charges controller.
      ShippingukChargesController = $controller('Shippinguk chargesController as vm', {
        $scope: $scope,
        shippingukChargeResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleShippingukChargePostData;

      beforeEach(function () {
        // Create a sample Shippinguk charge object
        sampleShippingukChargePostData = new ShippingukChargesService({
          name: 'Shippinguk charge Name'
        });

        $scope.vm.shippingukCharge = sampleShippingukChargePostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (ShippingukChargesService) {
        // Set POST response
        $httpBackend.expectPOST('api/shippinguk-charges', sampleShippingukChargePostData).respond(mockShippingukCharge);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Shippinguk charge was created
        expect($state.go).toHaveBeenCalledWith('shippinguk-charges.view', {
          shippingukChargeId: mockShippingukCharge._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/shippinguk-charges', sampleShippingukChargePostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Shippinguk charge in $scope
        $scope.vm.shippingukCharge = mockShippingukCharge;
      });

      it('should update a valid Shippinguk charge', inject(function (ShippingukChargesService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/shippinguk-charges\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('shippinguk-charges.view', {
          shippingukChargeId: mockShippingukCharge._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (ShippingukChargesService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/shippinguk-charges\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Shippinguk charges
        $scope.vm.shippingukCharge = mockShippingukCharge;
      });

      it('should delete the Shippinguk charge and redirect to Shippinguk charges', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/shippinguk-charges\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('shippinguk-charges.list');
      });

      it('should should not delete the Shippinguk charge and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());

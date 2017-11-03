(function () {
  'use strict';

  describe('Shipping charges Controller Tests', function () {
    // Initialize global variables
    var ShippingChargesController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      ShippingChargesService,
      mockShippingCharge;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _ShippingChargesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      ShippingChargesService = _ShippingChargesService_;

      // create mock Shipping charge
      mockShippingCharge = new ShippingChargesService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Shipping charge Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Shipping charges controller.
      ShippingChargesController = $controller('Shipping chargesController as vm', {
        $scope: $scope,
        shippingChargeResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleShippingChargePostData;

      beforeEach(function () {
        // Create a sample Shipping charge object
        sampleShippingChargePostData = new ShippingChargesService({
          name: 'Shipping charge Name'
        });

        $scope.vm.shippingCharge = sampleShippingChargePostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (ShippingChargesService) {
        // Set POST response
        $httpBackend.expectPOST('api/shipping-charges', sampleShippingChargePostData).respond(mockShippingCharge);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Shipping charge was created
        expect($state.go).toHaveBeenCalledWith('shipping-charges.view', {
          shippingChargeId: mockShippingCharge._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/shipping-charges', sampleShippingChargePostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Shipping charge in $scope
        $scope.vm.shippingCharge = mockShippingCharge;
      });

      it('should update a valid Shipping charge', inject(function (ShippingChargesService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/shipping-charges\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('shipping-charges.view', {
          shippingChargeId: mockShippingCharge._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (ShippingChargesService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/shipping-charges\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Shipping charges
        $scope.vm.shippingCharge = mockShippingCharge;
      });

      it('should delete the Shipping charge and redirect to Shipping charges', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/shipping-charges\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('shipping-charges.list');
      });

      it('should should not delete the Shipping charge and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());

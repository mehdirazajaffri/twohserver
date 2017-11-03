(function () {
  'use strict';

  describe('Used promo codes Controller Tests', function () {
    // Initialize global variables
    var UsedPromoCodesController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      UsedPromoCodesService,
      mockUsedPromoCode;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _UsedPromoCodesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      UsedPromoCodesService = _UsedPromoCodesService_;

      // create mock Used promo code
      mockUsedPromoCode = new UsedPromoCodesService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Used promo code Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Used promo codes controller.
      UsedPromoCodesController = $controller('Used promo codesController as vm', {
        $scope: $scope,
        usedPromoCodeResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleUsedPromoCodePostData;

      beforeEach(function () {
        // Create a sample Used promo code object
        sampleUsedPromoCodePostData = new UsedPromoCodesService({
          name: 'Used promo code Name'
        });

        $scope.vm.usedPromoCode = sampleUsedPromoCodePostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (UsedPromoCodesService) {
        // Set POST response
        $httpBackend.expectPOST('api/used-promo-codes', sampleUsedPromoCodePostData).respond(mockUsedPromoCode);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Used promo code was created
        expect($state.go).toHaveBeenCalledWith('used-promo-codes.view', {
          usedPromoCodeId: mockUsedPromoCode._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/used-promo-codes', sampleUsedPromoCodePostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Used promo code in $scope
        $scope.vm.usedPromoCode = mockUsedPromoCode;
      });

      it('should update a valid Used promo code', inject(function (UsedPromoCodesService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/used-promo-codes\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('used-promo-codes.view', {
          usedPromoCodeId: mockUsedPromoCode._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (UsedPromoCodesService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/used-promo-codes\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Used promo codes
        $scope.vm.usedPromoCode = mockUsedPromoCode;
      });

      it('should delete the Used promo code and redirect to Used promo codes', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/used-promo-codes\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('used-promo-codes.list');
      });

      it('should should not delete the Used promo code and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());

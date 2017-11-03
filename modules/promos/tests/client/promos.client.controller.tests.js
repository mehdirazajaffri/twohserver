(function () {
  'use strict';

  describe('Promos Controller Tests', function () {
    // Initialize global variables
    var PromosController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      PromosService,
      mockPromo;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _PromosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      PromosService = _PromosService_;

      // create mock Promo
      mockPromo = new PromosService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Promo Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Promos controller.
      PromosController = $controller('PromosController as vm', {
        $scope: $scope,
        promoResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var samplePromoPostData;

      beforeEach(function () {
        // Create a sample Promo object
        samplePromoPostData = new PromosService({
          name: 'Promo Name'
        });

        $scope.vm.promo = samplePromoPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (PromosService) {
        // Set POST response
        $httpBackend.expectPOST('api/promos', samplePromoPostData).respond(mockPromo);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Promo was created
        expect($state.go).toHaveBeenCalledWith('promos.view', {
          promoId: mockPromo._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/promos', samplePromoPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Promo in $scope
        $scope.vm.promo = mockPromo;
      });

      it('should update a valid Promo', inject(function (PromosService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/promos\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('promos.view', {
          promoId: mockPromo._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (PromosService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/promos\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Promos
        $scope.vm.promo = mockPromo;
      });

      it('should delete the Promo and redirect to Promos', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/promos\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('promos.list');
      });

      it('should should not delete the Promo and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());

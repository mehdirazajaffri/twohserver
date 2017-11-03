(function () {
  'use strict';

  describe('Brandsuks Controller Tests', function () {
    // Initialize global variables
    var BrandsuksController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      BrandsuksService,
      mockBrandsuk;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _BrandsuksService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      BrandsuksService = _BrandsuksService_;

      // create mock Brandsuk
      mockBrandsuk = new BrandsuksService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Brandsuk Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Brandsuks controller.
      BrandsuksController = $controller('BrandsuksController as vm', {
        $scope: $scope,
        brandsukResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleBrandsukPostData;

      beforeEach(function () {
        // Create a sample Brandsuk object
        sampleBrandsukPostData = new BrandsuksService({
          name: 'Brandsuk Name'
        });

        $scope.vm.brandsuk = sampleBrandsukPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (BrandsuksService) {
        // Set POST response
        $httpBackend.expectPOST('api/brandsuks', sampleBrandsukPostData).respond(mockBrandsuk);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Brandsuk was created
        expect($state.go).toHaveBeenCalledWith('brandsuks.view', {
          brandsukId: mockBrandsuk._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/brandsuks', sampleBrandsukPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Brandsuk in $scope
        $scope.vm.brandsuk = mockBrandsuk;
      });

      it('should update a valid Brandsuk', inject(function (BrandsuksService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/brandsuks\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('brandsuks.view', {
          brandsukId: mockBrandsuk._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (BrandsuksService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/brandsuks\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Brandsuks
        $scope.vm.brandsuk = mockBrandsuk;
      });

      it('should delete the Brandsuk and redirect to Brandsuks', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/brandsuks\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('brandsuks.list');
      });

      it('should should not delete the Brandsuk and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());

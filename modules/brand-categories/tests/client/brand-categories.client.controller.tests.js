(function () {
  'use strict';

  describe('Brand categories Controller Tests', function () {
    // Initialize global variables
    var BrandCategoriesController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      BrandCategoriesService,
      mockBrandCategory;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _BrandCategoriesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      BrandCategoriesService = _BrandCategoriesService_;

      // create mock Brand category
      mockBrandCategory = new BrandCategoriesService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Brand category Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Brand categories controller.
      BrandCategoriesController = $controller('Brand categoriesController as vm', {
        $scope: $scope,
        brandCategoryResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleBrandCategoryPostData;

      beforeEach(function () {
        // Create a sample Brand category object
        sampleBrandCategoryPostData = new BrandCategoriesService({
          name: 'Brand category Name'
        });

        $scope.vm.brandCategory = sampleBrandCategoryPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (BrandCategoriesService) {
        // Set POST response
        $httpBackend.expectPOST('api/brand-categories', sampleBrandCategoryPostData).respond(mockBrandCategory);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Brand category was created
        expect($state.go).toHaveBeenCalledWith('brand-categories.view', {
          brandCategoryId: mockBrandCategory._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/brand-categories', sampleBrandCategoryPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Brand category in $scope
        $scope.vm.brandCategory = mockBrandCategory;
      });

      it('should update a valid Brand category', inject(function (BrandCategoriesService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/brand-categories\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('brand-categories.view', {
          brandCategoryId: mockBrandCategory._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (BrandCategoriesService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/brand-categories\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Brand categories
        $scope.vm.brandCategory = mockBrandCategory;
      });

      it('should delete the Brand category and redirect to Brand categories', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/brand-categories\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('brand-categories.list');
      });

      it('should should not delete the Brand category and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());

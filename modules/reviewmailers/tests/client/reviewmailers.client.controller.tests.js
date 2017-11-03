(function () {
  'use strict';

  describe('Reviewmailers Controller Tests', function () {
    // Initialize global variables
    var ReviewmailersController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      ReviewmailersService,
      mockReviewmailer;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _ReviewmailersService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      ReviewmailersService = _ReviewmailersService_;

      // create mock Reviewmailer
      mockReviewmailer = new ReviewmailersService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Reviewmailer Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Reviewmailers controller.
      ReviewmailersController = $controller('ReviewmailersController as vm', {
        $scope: $scope,
        reviewmailerResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleReviewmailerPostData;

      beforeEach(function () {
        // Create a sample Reviewmailer object
        sampleReviewmailerPostData = new ReviewmailersService({
          name: 'Reviewmailer Name'
        });

        $scope.vm.reviewmailer = sampleReviewmailerPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (ReviewmailersService) {
        // Set POST response
        $httpBackend.expectPOST('api/reviewmailers', sampleReviewmailerPostData).respond(mockReviewmailer);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Reviewmailer was created
        expect($state.go).toHaveBeenCalledWith('reviewmailers.view', {
          reviewmailerId: mockReviewmailer._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/reviewmailers', sampleReviewmailerPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Reviewmailer in $scope
        $scope.vm.reviewmailer = mockReviewmailer;
      });

      it('should update a valid Reviewmailer', inject(function (ReviewmailersService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/reviewmailers\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('reviewmailers.view', {
          reviewmailerId: mockReviewmailer._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (ReviewmailersService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/reviewmailers\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Reviewmailers
        $scope.vm.reviewmailer = mockReviewmailer;
      });

      it('should delete the Reviewmailer and redirect to Reviewmailers', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/reviewmailers\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('reviewmailers.list');
      });

      it('should should not delete the Reviewmailer and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());

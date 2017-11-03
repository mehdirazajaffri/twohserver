(function () {
  'use strict';

  describe('Mailers Controller Tests', function () {
    // Initialize global variables
    var MailersController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      MailersService,
      mockMailer;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _MailersService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      MailersService = _MailersService_;

      // create mock Mailer
      mockMailer = new MailersService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Mailer Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Mailers controller.
      MailersController = $controller('MailersController as vm', {
        $scope: $scope,
        mailerResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleMailerPostData;

      beforeEach(function () {
        // Create a sample Mailer object
        sampleMailerPostData = new MailersService({
          name: 'Mailer Name'
        });

        $scope.vm.mailer = sampleMailerPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (MailersService) {
        // Set POST response
        $httpBackend.expectPOST('api/mailers', sampleMailerPostData).respond(mockMailer);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Mailer was created
        expect($state.go).toHaveBeenCalledWith('mailers.view', {
          mailerId: mockMailer._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/mailers', sampleMailerPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Mailer in $scope
        $scope.vm.mailer = mockMailer;
      });

      it('should update a valid Mailer', inject(function (MailersService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/mailers\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('mailers.view', {
          mailerId: mockMailer._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (MailersService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/mailers\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Mailers
        $scope.vm.mailer = mockMailer;
      });

      it('should delete the Mailer and redirect to Mailers', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/mailers\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('mailers.list');
      });

      it('should should not delete the Mailer and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());

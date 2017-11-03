(function () {
  'use strict';

  describe('Mailers Route Tests', function () {
    // Initialize global variables
    var $scope,
      MailersService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _MailersService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      MailersService = _MailersService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('mailers');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/mailers');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          MailersController,
          mockMailer;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('mailers.view');
          $templateCache.put('modules/mailers/client/views/view-mailer.client.view.html', '');

          // create mock Mailer
          mockMailer = new MailersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Mailer Name'
          });

          // Initialize Controller
          MailersController = $controller('MailersController as vm', {
            $scope: $scope,
            mailerResolve: mockMailer
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:mailerId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.mailerResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            mailerId: 1
          })).toEqual('/mailers/1');
        }));

        it('should attach an Mailer to the controller scope', function () {
          expect($scope.vm.mailer._id).toBe(mockMailer._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/mailers/client/views/view-mailer.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          MailersController,
          mockMailer;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('mailers.create');
          $templateCache.put('modules/mailers/client/views/form-mailer.client.view.html', '');

          // create mock Mailer
          mockMailer = new MailersService();

          // Initialize Controller
          MailersController = $controller('MailersController as vm', {
            $scope: $scope,
            mailerResolve: mockMailer
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.mailerResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/mailers/create');
        }));

        it('should attach an Mailer to the controller scope', function () {
          expect($scope.vm.mailer._id).toBe(mockMailer._id);
          expect($scope.vm.mailer._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/mailers/client/views/form-mailer.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          MailersController,
          mockMailer;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('mailers.edit');
          $templateCache.put('modules/mailers/client/views/form-mailer.client.view.html', '');

          // create mock Mailer
          mockMailer = new MailersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Mailer Name'
          });

          // Initialize Controller
          MailersController = $controller('MailersController as vm', {
            $scope: $scope,
            mailerResolve: mockMailer
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:mailerId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.mailerResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            mailerId: 1
          })).toEqual('/mailers/1/edit');
        }));

        it('should attach an Mailer to the controller scope', function () {
          expect($scope.vm.mailer._id).toBe(mockMailer._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/mailers/client/views/form-mailer.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());

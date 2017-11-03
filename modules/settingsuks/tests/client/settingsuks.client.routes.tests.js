(function () {
  'use strict';

  describe('Settingsuks Route Tests', function () {
    // Initialize global variables
    var $scope,
      SettingsuksService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _SettingsuksService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      SettingsuksService = _SettingsuksService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('settingsuks');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/settingsuks');
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
          SettingsuksController,
          mockSettingsuk;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('settingsuks.view');
          $templateCache.put('modules/settingsuks/client/views/view-settingsuk.client.view.html', '');

          // create mock Settingsuk
          mockSettingsuk = new SettingsuksService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Settingsuk Name'
          });

          // Initialize Controller
          SettingsuksController = $controller('SettingsuksController as vm', {
            $scope: $scope,
            settingsukResolve: mockSettingsuk
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:settingsukId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.settingsukResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            settingsukId: 1
          })).toEqual('/settingsuks/1');
        }));

        it('should attach an Settingsuk to the controller scope', function () {
          expect($scope.vm.settingsuk._id).toBe(mockSettingsuk._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/settingsuks/client/views/view-settingsuk.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          SettingsuksController,
          mockSettingsuk;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('settingsuks.create');
          $templateCache.put('modules/settingsuks/client/views/form-settingsuk.client.view.html', '');

          // create mock Settingsuk
          mockSettingsuk = new SettingsuksService();

          // Initialize Controller
          SettingsuksController = $controller('SettingsuksController as vm', {
            $scope: $scope,
            settingsukResolve: mockSettingsuk
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.settingsukResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/settingsuks/create');
        }));

        it('should attach an Settingsuk to the controller scope', function () {
          expect($scope.vm.settingsuk._id).toBe(mockSettingsuk._id);
          expect($scope.vm.settingsuk._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/settingsuks/client/views/form-settingsuk.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          SettingsuksController,
          mockSettingsuk;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('settingsuks.edit');
          $templateCache.put('modules/settingsuks/client/views/form-settingsuk.client.view.html', '');

          // create mock Settingsuk
          mockSettingsuk = new SettingsuksService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Settingsuk Name'
          });

          // Initialize Controller
          SettingsuksController = $controller('SettingsuksController as vm', {
            $scope: $scope,
            settingsukResolve: mockSettingsuk
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:settingsukId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.settingsukResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            settingsukId: 1
          })).toEqual('/settingsuks/1/edit');
        }));

        it('should attach an Settingsuk to the controller scope', function () {
          expect($scope.vm.settingsuk._id).toBe(mockSettingsuk._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/settingsuks/client/views/form-settingsuk.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());

(function () {
  'use strict';

  describe('Brandsuks Route Tests', function () {
    // Initialize global variables
    var $scope,
      BrandsuksService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _BrandsuksService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      BrandsuksService = _BrandsuksService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('brandsuks');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/brandsuks');
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
          BrandsuksController,
          mockBrandsuk;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('brandsuks.view');
          $templateCache.put('modules/brandsuks/client/views/view-brandsuk.client.view.html', '');

          // create mock Brandsuk
          mockBrandsuk = new BrandsuksService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Brandsuk Name'
          });

          // Initialize Controller
          BrandsuksController = $controller('BrandsuksController as vm', {
            $scope: $scope,
            brandsukResolve: mockBrandsuk
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:brandsukId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.brandsukResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            brandsukId: 1
          })).toEqual('/brandsuks/1');
        }));

        it('should attach an Brandsuk to the controller scope', function () {
          expect($scope.vm.brandsuk._id).toBe(mockBrandsuk._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/brandsuks/client/views/view-brandsuk.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          BrandsuksController,
          mockBrandsuk;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('brandsuks.create');
          $templateCache.put('modules/brandsuks/client/views/form-brandsuk.client.view.html', '');

          // create mock Brandsuk
          mockBrandsuk = new BrandsuksService();

          // Initialize Controller
          BrandsuksController = $controller('BrandsuksController as vm', {
            $scope: $scope,
            brandsukResolve: mockBrandsuk
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.brandsukResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/brandsuks/create');
        }));

        it('should attach an Brandsuk to the controller scope', function () {
          expect($scope.vm.brandsuk._id).toBe(mockBrandsuk._id);
          expect($scope.vm.brandsuk._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/brandsuks/client/views/form-brandsuk.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          BrandsuksController,
          mockBrandsuk;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('brandsuks.edit');
          $templateCache.put('modules/brandsuks/client/views/form-brandsuk.client.view.html', '');

          // create mock Brandsuk
          mockBrandsuk = new BrandsuksService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Brandsuk Name'
          });

          // Initialize Controller
          BrandsuksController = $controller('BrandsuksController as vm', {
            $scope: $scope,
            brandsukResolve: mockBrandsuk
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:brandsukId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.brandsukResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            brandsukId: 1
          })).toEqual('/brandsuks/1/edit');
        }));

        it('should attach an Brandsuk to the controller scope', function () {
          expect($scope.vm.brandsuk._id).toBe(mockBrandsuk._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/brandsuks/client/views/form-brandsuk.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());

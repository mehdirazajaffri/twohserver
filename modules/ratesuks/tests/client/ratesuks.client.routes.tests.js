(function () {
  'use strict';

  describe('Ratesuks Route Tests', function () {
    // Initialize global variables
    var $scope,
      RatesuksService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _RatesuksService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      RatesuksService = _RatesuksService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('ratesuks');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/ratesuks');
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
          RatesuksController,
          mockRatesuk;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('ratesuks.view');
          $templateCache.put('modules/ratesuks/client/views/view-ratesuk.client.view.html', '');

          // create mock Ratesuk
          mockRatesuk = new RatesuksService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Ratesuk Name'
          });

          // Initialize Controller
          RatesuksController = $controller('RatesuksController as vm', {
            $scope: $scope,
            ratesukResolve: mockRatesuk
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:ratesukId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.ratesukResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            ratesukId: 1
          })).toEqual('/ratesuks/1');
        }));

        it('should attach an Ratesuk to the controller scope', function () {
          expect($scope.vm.ratesuk._id).toBe(mockRatesuk._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/ratesuks/client/views/view-ratesuk.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          RatesuksController,
          mockRatesuk;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('ratesuks.create');
          $templateCache.put('modules/ratesuks/client/views/form-ratesuk.client.view.html', '');

          // create mock Ratesuk
          mockRatesuk = new RatesuksService();

          // Initialize Controller
          RatesuksController = $controller('RatesuksController as vm', {
            $scope: $scope,
            ratesukResolve: mockRatesuk
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.ratesukResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/ratesuks/create');
        }));

        it('should attach an Ratesuk to the controller scope', function () {
          expect($scope.vm.ratesuk._id).toBe(mockRatesuk._id);
          expect($scope.vm.ratesuk._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/ratesuks/client/views/form-ratesuk.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          RatesuksController,
          mockRatesuk;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('ratesuks.edit');
          $templateCache.put('modules/ratesuks/client/views/form-ratesuk.client.view.html', '');

          // create mock Ratesuk
          mockRatesuk = new RatesuksService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Ratesuk Name'
          });

          // Initialize Controller
          RatesuksController = $controller('RatesuksController as vm', {
            $scope: $scope,
            ratesukResolve: mockRatesuk
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:ratesukId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.ratesukResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            ratesukId: 1
          })).toEqual('/ratesuks/1/edit');
        }));

        it('should attach an Ratesuk to the controller scope', function () {
          expect($scope.vm.ratesuk._id).toBe(mockRatesuk._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/ratesuks/client/views/form-ratesuk.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());

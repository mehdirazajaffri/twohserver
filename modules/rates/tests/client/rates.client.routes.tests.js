(function () {
  'use strict';

  describe('Rates Route Tests', function () {
    // Initialize global variables
    var $scope,
      RatesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _RatesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      RatesService = _RatesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('rates');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/rates');
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
          RatesController,
          mockRate;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('rates.view');
          $templateCache.put('modules/rates/client/views/view-rate.client.view.html', '');

          // create mock Rate
          mockRate = new RatesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Rate Name'
          });

          // Initialize Controller
          RatesController = $controller('RatesController as vm', {
            $scope: $scope,
            rateResolve: mockRate
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:rateId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.rateResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            rateId: 1
          })).toEqual('/rates/1');
        }));

        it('should attach an Rate to the controller scope', function () {
          expect($scope.vm.rate._id).toBe(mockRate._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/rates/client/views/view-rate.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          RatesController,
          mockRate;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('rates.create');
          $templateCache.put('modules/rates/client/views/form-rate.client.view.html', '');

          // create mock Rate
          mockRate = new RatesService();

          // Initialize Controller
          RatesController = $controller('RatesController as vm', {
            $scope: $scope,
            rateResolve: mockRate
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.rateResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/rates/create');
        }));

        it('should attach an Rate to the controller scope', function () {
          expect($scope.vm.rate._id).toBe(mockRate._id);
          expect($scope.vm.rate._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/rates/client/views/form-rate.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          RatesController,
          mockRate;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('rates.edit');
          $templateCache.put('modules/rates/client/views/form-rate.client.view.html', '');

          // create mock Rate
          mockRate = new RatesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Rate Name'
          });

          // Initialize Controller
          RatesController = $controller('RatesController as vm', {
            $scope: $scope,
            rateResolve: mockRate
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:rateId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.rateResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            rateId: 1
          })).toEqual('/rates/1/edit');
        }));

        it('should attach an Rate to the controller scope', function () {
          expect($scope.vm.rate._id).toBe(mockRate._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/rates/client/views/form-rate.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());

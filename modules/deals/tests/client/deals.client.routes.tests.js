(function () {
  'use strict';

  describe('Deals Route Tests', function () {
    // Initialize global variables
    var $scope,
      DealsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _DealsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      DealsService = _DealsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('deals');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/deals');
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
          DealsController,
          mockDeal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('deals.view');
          $templateCache.put('modules/deals/client/views/view-deal.client.view.html', '');

          // create mock Deal
          mockDeal = new DealsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Deal Name'
          });

          // Initialize Controller
          DealsController = $controller('DealsController as vm', {
            $scope: $scope,
            dealResolve: mockDeal
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:dealId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.dealResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            dealId: 1
          })).toEqual('/deals/1');
        }));

        it('should attach an Deal to the controller scope', function () {
          expect($scope.vm.deal._id).toBe(mockDeal._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/deals/client/views/view-deal.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          DealsController,
          mockDeal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('deals.create');
          $templateCache.put('modules/deals/client/views/form-deal.client.view.html', '');

          // create mock Deal
          mockDeal = new DealsService();

          // Initialize Controller
          DealsController = $controller('DealsController as vm', {
            $scope: $scope,
            dealResolve: mockDeal
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.dealResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/deals/create');
        }));

        it('should attach an Deal to the controller scope', function () {
          expect($scope.vm.deal._id).toBe(mockDeal._id);
          expect($scope.vm.deal._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/deals/client/views/form-deal.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          DealsController,
          mockDeal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('deals.edit');
          $templateCache.put('modules/deals/client/views/form-deal.client.view.html', '');

          // create mock Deal
          mockDeal = new DealsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Deal Name'
          });

          // Initialize Controller
          DealsController = $controller('DealsController as vm', {
            $scope: $scope,
            dealResolve: mockDeal
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:dealId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.dealResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            dealId: 1
          })).toEqual('/deals/1/edit');
        }));

        it('should attach an Deal to the controller scope', function () {
          expect($scope.vm.deal._id).toBe(mockDeal._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/deals/client/views/form-deal.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());

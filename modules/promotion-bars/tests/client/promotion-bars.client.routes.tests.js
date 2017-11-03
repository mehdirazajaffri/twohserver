(function () {
  'use strict';

  describe('Promotion bars Route Tests', function () {
    // Initialize global variables
    var $scope,
      PromotionBarsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _PromotionBarsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      PromotionBarsService = _PromotionBarsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('promotion-bars');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/promotion-bars');
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
          PromotionBarsController,
          mockPromotionBar;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('promotion-bars.view');
          $templateCache.put('modules/promotion-bars/client/views/view-promotion-bar.client.view.html', '');

          // create mock Promotion bar
          mockPromotionBar = new PromotionBarsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Promotion bar Name'
          });

          // Initialize Controller
          PromotionBarsController = $controller('PromotionBarsController as vm', {
            $scope: $scope,
            promotionBarResolve: mockPromotionBar
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:promotionBarId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.promotionBarResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            promotionBarId: 1
          })).toEqual('/promotion-bars/1');
        }));

        it('should attach an Promotion bar to the controller scope', function () {
          expect($scope.vm.promotionBar._id).toBe(mockPromotionBar._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/promotion-bars/client/views/view-promotion-bar.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          PromotionBarsController,
          mockPromotionBar;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('promotion-bars.create');
          $templateCache.put('modules/promotion-bars/client/views/form-promotion-bar.client.view.html', '');

          // create mock Promotion bar
          mockPromotionBar = new PromotionBarsService();

          // Initialize Controller
          PromotionBarsController = $controller('PromotionBarsController as vm', {
            $scope: $scope,
            promotionBarResolve: mockPromotionBar
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.promotionBarResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/promotion-bars/create');
        }));

        it('should attach an Promotion bar to the controller scope', function () {
          expect($scope.vm.promotionBar._id).toBe(mockPromotionBar._id);
          expect($scope.vm.promotionBar._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/promotion-bars/client/views/form-promotion-bar.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          PromotionBarsController,
          mockPromotionBar;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('promotion-bars.edit');
          $templateCache.put('modules/promotion-bars/client/views/form-promotion-bar.client.view.html', '');

          // create mock Promotion bar
          mockPromotionBar = new PromotionBarsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Promotion bar Name'
          });

          // Initialize Controller
          PromotionBarsController = $controller('PromotionBarsController as vm', {
            $scope: $scope,
            promotionBarResolve: mockPromotionBar
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:promotionBarId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.promotionBarResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            promotionBarId: 1
          })).toEqual('/promotion-bars/1/edit');
        }));

        it('should attach an Promotion bar to the controller scope', function () {
          expect($scope.vm.promotionBar._id).toBe(mockPromotionBar._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/promotion-bars/client/views/form-promotionBar.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());

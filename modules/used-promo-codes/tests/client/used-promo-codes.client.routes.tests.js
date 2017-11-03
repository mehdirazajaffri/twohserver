(function () {
  'use strict';

  describe('Used promo codes Route Tests', function () {
    // Initialize global variables
    var $scope,
      UsedPromoCodesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _UsedPromoCodesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      UsedPromoCodesService = _UsedPromoCodesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('used-promo-codes');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/used-promo-codes');
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
          UsedPromoCodesController,
          mockUsedPromoCode;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('used-promo-codes.view');
          $templateCache.put('modules/used-promo-codes/client/views/view-used-promo-code.client.view.html', '');

          // create mock Used promo code
          mockUsedPromoCode = new UsedPromoCodesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Used promo code Name'
          });

          // Initialize Controller
          UsedPromoCodesController = $controller('UsedPromoCodesController as vm', {
            $scope: $scope,
            usedPromoCodeResolve: mockUsedPromoCode
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:usedPromoCodeId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.usedPromoCodeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            usedPromoCodeId: 1
          })).toEqual('/used-promo-codes/1');
        }));

        it('should attach an Used promo code to the controller scope', function () {
          expect($scope.vm.usedPromoCode._id).toBe(mockUsedPromoCode._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/used-promo-codes/client/views/view-used-promo-code.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          UsedPromoCodesController,
          mockUsedPromoCode;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('used-promo-codes.create');
          $templateCache.put('modules/used-promo-codes/client/views/form-used-promo-code.client.view.html', '');

          // create mock Used promo code
          mockUsedPromoCode = new UsedPromoCodesService();

          // Initialize Controller
          UsedPromoCodesController = $controller('UsedPromoCodesController as vm', {
            $scope: $scope,
            usedPromoCodeResolve: mockUsedPromoCode
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.usedPromoCodeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/used-promo-codes/create');
        }));

        it('should attach an Used promo code to the controller scope', function () {
          expect($scope.vm.usedPromoCode._id).toBe(mockUsedPromoCode._id);
          expect($scope.vm.usedPromoCode._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/used-promo-codes/client/views/form-used-promo-code.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          UsedPromoCodesController,
          mockUsedPromoCode;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('used-promo-codes.edit');
          $templateCache.put('modules/used-promo-codes/client/views/form-used-promo-code.client.view.html', '');

          // create mock Used promo code
          mockUsedPromoCode = new UsedPromoCodesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Used promo code Name'
          });

          // Initialize Controller
          UsedPromoCodesController = $controller('UsedPromoCodesController as vm', {
            $scope: $scope,
            usedPromoCodeResolve: mockUsedPromoCode
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:usedPromoCodeId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.usedPromoCodeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            usedPromoCodeId: 1
          })).toEqual('/used-promo-codes/1/edit');
        }));

        it('should attach an Used promo code to the controller scope', function () {
          expect($scope.vm.usedPromoCode._id).toBe(mockUsedPromoCode._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/used-promo-codes/client/views/form-usedPromoCode.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());

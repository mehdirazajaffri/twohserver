(function () {
  'use strict';

  describe('Shipping charges Route Tests', function () {
    // Initialize global variables
    var $scope,
      ShippingChargesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ShippingChargesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ShippingChargesService = _ShippingChargesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('shipping-charges');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/shipping-charges');
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
          ShippingChargesController,
          mockShippingCharge;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('shipping-charges.view');
          $templateCache.put('modules/shipping-charges/client/views/view-shipping-charge.client.view.html', '');

          // create mock Shipping charge
          mockShippingCharge = new ShippingChargesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Shipping charge Name'
          });

          // Initialize Controller
          ShippingChargesController = $controller('ShippingChargesController as vm', {
            $scope: $scope,
            shippingChargeResolve: mockShippingCharge
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:shippingChargeId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.shippingChargeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            shippingChargeId: 1
          })).toEqual('/shipping-charges/1');
        }));

        it('should attach an Shipping charge to the controller scope', function () {
          expect($scope.vm.shippingCharge._id).toBe(mockShippingCharge._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/shipping-charges/client/views/view-shipping-charge.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ShippingChargesController,
          mockShippingCharge;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('shipping-charges.create');
          $templateCache.put('modules/shipping-charges/client/views/form-shipping-charge.client.view.html', '');

          // create mock Shipping charge
          mockShippingCharge = new ShippingChargesService();

          // Initialize Controller
          ShippingChargesController = $controller('ShippingChargesController as vm', {
            $scope: $scope,
            shippingChargeResolve: mockShippingCharge
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.shippingChargeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/shipping-charges/create');
        }));

        it('should attach an Shipping charge to the controller scope', function () {
          expect($scope.vm.shippingCharge._id).toBe(mockShippingCharge._id);
          expect($scope.vm.shippingCharge._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/shipping-charges/client/views/form-shipping-charge.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ShippingChargesController,
          mockShippingCharge;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('shipping-charges.edit');
          $templateCache.put('modules/shipping-charges/client/views/form-shipping-charge.client.view.html', '');

          // create mock Shipping charge
          mockShippingCharge = new ShippingChargesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Shipping charge Name'
          });

          // Initialize Controller
          ShippingChargesController = $controller('ShippingChargesController as vm', {
            $scope: $scope,
            shippingChargeResolve: mockShippingCharge
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:shippingChargeId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.shippingChargeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            shippingChargeId: 1
          })).toEqual('/shipping-charges/1/edit');
        }));

        it('should attach an Shipping charge to the controller scope', function () {
          expect($scope.vm.shippingCharge._id).toBe(mockShippingCharge._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/shipping-charges/client/views/form-shippingCharge.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());

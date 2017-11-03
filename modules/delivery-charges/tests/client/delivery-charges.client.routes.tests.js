(function () {
  'use strict';

  describe('Delivery charges Route Tests', function () {
    // Initialize global variables
    var $scope,
      DeliveryChargesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _DeliveryChargesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      DeliveryChargesService = _DeliveryChargesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('delivery-charges');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/delivery-charges');
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
          DeliveryChargesController,
          mockDeliveryCharge;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('delivery-charges.view');
          $templateCache.put('modules/delivery-charges/client/views/view-delivery-charge.client.view.html', '');

          // create mock Delivery charge
          mockDeliveryCharge = new DeliveryChargesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Delivery charge Name'
          });

          // Initialize Controller
          DeliveryChargesController = $controller('DeliveryChargesController as vm', {
            $scope: $scope,
            deliveryChargeResolve: mockDeliveryCharge
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:deliveryChargeId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.deliveryChargeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            deliveryChargeId: 1
          })).toEqual('/delivery-charges/1');
        }));

        it('should attach an Delivery charge to the controller scope', function () {
          expect($scope.vm.deliveryCharge._id).toBe(mockDeliveryCharge._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/delivery-charges/client/views/view-delivery-charge.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          DeliveryChargesController,
          mockDeliveryCharge;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('delivery-charges.create');
          $templateCache.put('modules/delivery-charges/client/views/form-delivery-charge.client.view.html', '');

          // create mock Delivery charge
          mockDeliveryCharge = new DeliveryChargesService();

          // Initialize Controller
          DeliveryChargesController = $controller('DeliveryChargesController as vm', {
            $scope: $scope,
            deliveryChargeResolve: mockDeliveryCharge
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.deliveryChargeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/delivery-charges/create');
        }));

        it('should attach an Delivery charge to the controller scope', function () {
          expect($scope.vm.deliveryCharge._id).toBe(mockDeliveryCharge._id);
          expect($scope.vm.deliveryCharge._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/delivery-charges/client/views/form-delivery-charge.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          DeliveryChargesController,
          mockDeliveryCharge;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('delivery-charges.edit');
          $templateCache.put('modules/delivery-charges/client/views/form-delivery-charge.client.view.html', '');

          // create mock Delivery charge
          mockDeliveryCharge = new DeliveryChargesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Delivery charge Name'
          });

          // Initialize Controller
          DeliveryChargesController = $controller('DeliveryChargesController as vm', {
            $scope: $scope,
            deliveryChargeResolve: mockDeliveryCharge
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:deliveryChargeId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.deliveryChargeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            deliveryChargeId: 1
          })).toEqual('/delivery-charges/1/edit');
        }));

        it('should attach an Delivery charge to the controller scope', function () {
          expect($scope.vm.deliveryCharge._id).toBe(mockDeliveryCharge._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/delivery-charges/client/views/form-deliveryCharge.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());

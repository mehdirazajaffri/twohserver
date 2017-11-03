(function () {
  'use strict';

  describe('Ordersuks Route Tests', function () {
    // Initialize global variables
    var $scope,
      OrdersuksService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _OrdersuksService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      OrdersuksService = _OrdersuksService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('ordersuks');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/ordersuks');
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
          OrdersuksController,
          mockOrdersuk;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('ordersuks.view');
          $templateCache.put('modules/ordersuks/client/views/view-ordersuk.client.view.html', '');

          // create mock Ordersuk
          mockOrdersuk = new OrdersuksService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Ordersuk Name'
          });

          // Initialize Controller
          OrdersuksController = $controller('OrdersuksController as vm', {
            $scope: $scope,
            ordersukResolve: mockOrdersuk
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:ordersukId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.ordersukResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            ordersukId: 1
          })).toEqual('/ordersuks/1');
        }));

        it('should attach an Ordersuk to the controller scope', function () {
          expect($scope.vm.ordersuk._id).toBe(mockOrdersuk._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/ordersuks/client/views/view-ordersuk.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          OrdersuksController,
          mockOrdersuk;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('ordersuks.create');
          $templateCache.put('modules/ordersuks/client/views/form-ordersuk.client.view.html', '');

          // create mock Ordersuk
          mockOrdersuk = new OrdersuksService();

          // Initialize Controller
          OrdersuksController = $controller('OrdersuksController as vm', {
            $scope: $scope,
            ordersukResolve: mockOrdersuk
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.ordersukResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/ordersuks/create');
        }));

        it('should attach an Ordersuk to the controller scope', function () {
          expect($scope.vm.ordersuk._id).toBe(mockOrdersuk._id);
          expect($scope.vm.ordersuk._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/ordersuks/client/views/form-ordersuk.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          OrdersuksController,
          mockOrdersuk;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('ordersuks.edit');
          $templateCache.put('modules/ordersuks/client/views/form-ordersuk.client.view.html', '');

          // create mock Ordersuk
          mockOrdersuk = new OrdersuksService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Ordersuk Name'
          });

          // Initialize Controller
          OrdersuksController = $controller('OrdersuksController as vm', {
            $scope: $scope,
            ordersukResolve: mockOrdersuk
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:ordersukId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.ordersukResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            ordersukId: 1
          })).toEqual('/ordersuks/1/edit');
        }));

        it('should attach an Ordersuk to the controller scope', function () {
          expect($scope.vm.ordersuk._id).toBe(mockOrdersuk._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/ordersuks/client/views/form-ordersuk.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());

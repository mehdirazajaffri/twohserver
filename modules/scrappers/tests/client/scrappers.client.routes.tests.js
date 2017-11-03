(function () {
  'use strict';

  describe('Scrappers Route Tests', function () {
    // Initialize global variables
    var $scope,
      ScrappersService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ScrappersService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ScrappersService = _ScrappersService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('scrappers');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/scrappers');
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
          ScrappersController,
          mockScrapper;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('scrappers.view');
          $templateCache.put('modules/scrappers/client/views/view-scrapper.client.view.html', '');

          // create mock Scrapper
          mockScrapper = new ScrappersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Scrapper Name'
          });

          // Initialize Controller
          ScrappersController = $controller('ScrappersController as vm', {
            $scope: $scope,
            scrapperResolve: mockScrapper
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:scrapperId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.scrapperResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            scrapperId: 1
          })).toEqual('/scrappers/1');
        }));

        it('should attach an Scrapper to the controller scope', function () {
          expect($scope.vm.scrapper._id).toBe(mockScrapper._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/scrappers/client/views/view-scrapper.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ScrappersController,
          mockScrapper;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('scrappers.create');
          $templateCache.put('modules/scrappers/client/views/form-scrapper.client.view.html', '');

          // create mock Scrapper
          mockScrapper = new ScrappersService();

          // Initialize Controller
          ScrappersController = $controller('ScrappersController as vm', {
            $scope: $scope,
            scrapperResolve: mockScrapper
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.scrapperResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/scrappers/create');
        }));

        it('should attach an Scrapper to the controller scope', function () {
          expect($scope.vm.scrapper._id).toBe(mockScrapper._id);
          expect($scope.vm.scrapper._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/scrappers/client/views/form-scrapper.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ScrappersController,
          mockScrapper;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('scrappers.edit');
          $templateCache.put('modules/scrappers/client/views/form-scrapper.client.view.html', '');

          // create mock Scrapper
          mockScrapper = new ScrappersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Scrapper Name'
          });

          // Initialize Controller
          ScrappersController = $controller('ScrappersController as vm', {
            $scope: $scope,
            scrapperResolve: mockScrapper
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:scrapperId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.scrapperResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            scrapperId: 1
          })).toEqual('/scrappers/1/edit');
        }));

        it('should attach an Scrapper to the controller scope', function () {
          expect($scope.vm.scrapper._id).toBe(mockScrapper._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/scrappers/client/views/form-scrapper.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());

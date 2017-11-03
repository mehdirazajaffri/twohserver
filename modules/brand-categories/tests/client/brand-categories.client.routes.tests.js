(function () {
  'use strict';

  describe('Brand categories Route Tests', function () {
    // Initialize global variables
    var $scope,
      BrandCategoriesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _BrandCategoriesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      BrandCategoriesService = _BrandCategoriesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('brand-categories');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/brand-categories');
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
          BrandCategoriesController,
          mockBrandCategory;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('brand-categories.view');
          $templateCache.put('modules/brand-categories/client/views/view-brand-category.client.view.html', '');

          // create mock Brand category
          mockBrandCategory = new BrandCategoriesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Brand category Name'
          });

          // Initialize Controller
          BrandCategoriesController = $controller('BrandCategoriesController as vm', {
            $scope: $scope,
            brandCategoryResolve: mockBrandCategory
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:brandCategoryId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.brandCategoryResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            brandCategoryId: 1
          })).toEqual('/brand-categories/1');
        }));

        it('should attach an Brand category to the controller scope', function () {
          expect($scope.vm.brandCategory._id).toBe(mockBrandCategory._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/brand-categories/client/views/view-brand-category.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          BrandCategoriesController,
          mockBrandCategory;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('brand-categories.create');
          $templateCache.put('modules/brand-categories/client/views/form-brand-category.client.view.html', '');

          // create mock Brand category
          mockBrandCategory = new BrandCategoriesService();

          // Initialize Controller
          BrandCategoriesController = $controller('BrandCategoriesController as vm', {
            $scope: $scope,
            brandCategoryResolve: mockBrandCategory
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.brandCategoryResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/brand-categories/create');
        }));

        it('should attach an Brand category to the controller scope', function () {
          expect($scope.vm.brandCategory._id).toBe(mockBrandCategory._id);
          expect($scope.vm.brandCategory._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/brand-categories/client/views/form-brand-category.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          BrandCategoriesController,
          mockBrandCategory;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('brand-categories.edit');
          $templateCache.put('modules/brand-categories/client/views/form-brand-category.client.view.html', '');

          // create mock Brand category
          mockBrandCategory = new BrandCategoriesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Brand category Name'
          });

          // Initialize Controller
          BrandCategoriesController = $controller('BrandCategoriesController as vm', {
            $scope: $scope,
            brandCategoryResolve: mockBrandCategory
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:brandCategoryId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.brandCategoryResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            brandCategoryId: 1
          })).toEqual('/brand-categories/1/edit');
        }));

        it('should attach an Brand category to the controller scope', function () {
          expect($scope.vm.brandCategory._id).toBe(mockBrandCategory._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/brand-categories/client/views/form-brandCategory.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());

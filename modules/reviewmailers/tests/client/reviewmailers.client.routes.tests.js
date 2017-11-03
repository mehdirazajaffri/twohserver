(function () {
  'use strict';

  describe('Reviewmailers Route Tests', function () {
    // Initialize global variables
    var $scope,
      ReviewmailersService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ReviewmailersService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ReviewmailersService = _ReviewmailersService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('reviewmailers');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/reviewmailers');
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
          ReviewmailersController,
          mockReviewmailer;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('reviewmailers.view');
          $templateCache.put('modules/reviewmailers/client/views/view-reviewmailer.client.view.html', '');

          // create mock Reviewmailer
          mockReviewmailer = new ReviewmailersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Reviewmailer Name'
          });

          // Initialize Controller
          ReviewmailersController = $controller('ReviewmailersController as vm', {
            $scope: $scope,
            reviewmailerResolve: mockReviewmailer
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:reviewmailerId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.reviewmailerResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            reviewmailerId: 1
          })).toEqual('/reviewmailers/1');
        }));

        it('should attach an Reviewmailer to the controller scope', function () {
          expect($scope.vm.reviewmailer._id).toBe(mockReviewmailer._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/reviewmailers/client/views/view-reviewmailer.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ReviewmailersController,
          mockReviewmailer;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('reviewmailers.create');
          $templateCache.put('modules/reviewmailers/client/views/form-reviewmailer.client.view.html', '');

          // create mock Reviewmailer
          mockReviewmailer = new ReviewmailersService();

          // Initialize Controller
          ReviewmailersController = $controller('ReviewmailersController as vm', {
            $scope: $scope,
            reviewmailerResolve: mockReviewmailer
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.reviewmailerResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/reviewmailers/create');
        }));

        it('should attach an Reviewmailer to the controller scope', function () {
          expect($scope.vm.reviewmailer._id).toBe(mockReviewmailer._id);
          expect($scope.vm.reviewmailer._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/reviewmailers/client/views/form-reviewmailer.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ReviewmailersController,
          mockReviewmailer;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('reviewmailers.edit');
          $templateCache.put('modules/reviewmailers/client/views/form-reviewmailer.client.view.html', '');

          // create mock Reviewmailer
          mockReviewmailer = new ReviewmailersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Reviewmailer Name'
          });

          // Initialize Controller
          ReviewmailersController = $controller('ReviewmailersController as vm', {
            $scope: $scope,
            reviewmailerResolve: mockReviewmailer
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:reviewmailerId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.reviewmailerResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            reviewmailerId: 1
          })).toEqual('/reviewmailers/1/edit');
        }));

        it('should attach an Reviewmailer to the controller scope', function () {
          expect($scope.vm.reviewmailer._id).toBe(mockReviewmailer._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/reviewmailers/client/views/form-reviewmailer.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());

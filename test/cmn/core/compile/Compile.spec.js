define(['module', 'Squire', 'angular-mocks'], function(module, Squire, angular) {
   'use strict';

   describe(module.id, function () {

      var $rootScope, $compile,
         injector = new Squire('squire');

      beforeEach(injector.run([
            'src/cmn/core/compile/module'
         ], angular.noop
      ));

      afterEach(function() {
         injector.remove();
      });

      beforeEach(angular.mock.module('ngModule'));

      beforeEach(angular.mock.inject(function (_$rootScope_, _$compile_) {
         $rootScope = _$rootScope_;
         $compile = _$compile_;
      }));

      it('should compile template', function () {
         var $scope = $rootScope.$new();
         $scope.test = 'test1';
         $scope.template = '<div ng-bind="test"></div>';
         var element = angular.element('<div compile="template"></div>');
         $compile(element)($scope);
         $scope.$digest();
         expect(element.text()).toEqual('test1');
      });
   });
});
define([
   'module',
   'angular-mocks',
   'src/core/compile/module'
], function(module, angular) {
   'use strict';
   /*global describe : false, beforeEach : false, inject : false, it : false, expect : false*/

   describe(module.id, function() {
      it('should compile template', function() {
         var $injector = angular.injector(['ngModule']);
         var $rootScope = $injector.get('$rootScope');
         var $compile = $injector.get('$compile');
         var $scope = $rootScope.$new();
         $scope.test = 'test1';
         $scope.template = '<div ng-bind=\"test\"></div>';
         var element = angular.element('<div compile="template"></div>');
         $compile(element)($scope);
         $scope.$digest();
         expect(element.text()).toEqual('test1');
      });
   });
});
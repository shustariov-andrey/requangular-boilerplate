define([
   'module',
   'angular',
   'src/cmn/core/config/module',
   'src/cmn/components/application/module'
], function(module, angular, Config) {
   'use strict';
   /*global describe : false, beforeEach : false, inject : false, it : false, expect : false, waitsFor : false, runs : false*/

   describe(module.id, function () {

      var $compile, $scope;

      beforeEach(function() {
         var $injector = angular.injector(['ngModule']);
         var $rootScope = $injector.get('$rootScope');
         $compile = $injector.get('$compile');
         $scope = $rootScope.$new();
      });

      it('should read main component name and title from config', function() {
         Config.setConfig({MainComponentName : 'test', ApplicationTitle : 'title'});

         var element = angular.element('<application></application>');
         $compile(element)($scope);
         $scope.$digest();
         expect($scope.getMainComponent()).toEqual('<test></test>');
         expect($scope.getTitle()).toEqual('title');
      });

      it('should error, when main component not specified', function() {
         Config.setConfig({});

         var element = angular.element('<application></application>');
         function f() {
            $compile(element)($scope);
         }

         expect(f).toThrow();
      });

      it('should stub application name with main component name', function() {
         Config.setConfig({MainComponentName : 'test'});

         var element = angular.element('<application></application>');
         $compile(element)($scope);
         $scope.$digest();
         expect($scope.getTitle()).toEqual('test');
      });
   });
});
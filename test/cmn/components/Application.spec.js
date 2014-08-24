define([
   'module',
   'angular-mocks',
   'Squire'
], function(module, angular, Squire) {
   'use strict';

   describe(module.id, function () {

      var $compile, $scope, injector = new Squire('squire'), Config;

      beforeEach(injector.run([
            'src/cmn/core/config/module',
            'src/cmn/components/application/module'
         ], function(_Config) {
            Config = _Config;
         }
      ));

      afterEach(function() {
         injector.clean([
            'src/cmn/core/config/module',
            'src/cmn/components/application/module'
         ]);
      });

      beforeEach(angular.mock.module('ngModule'));

      beforeEach(angular.mock.inject(function(_$rootScope_, _$compile_) {
         var $rootScope = _$rootScope_;
         $compile = _$compile_;
         $scope = $rootScope.$new();
      }));

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
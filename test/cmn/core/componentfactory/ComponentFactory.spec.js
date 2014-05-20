define([
   'module',
   'angular-mocks',
   'src/cmn/core/componentfactory/module'
], function(module, angular, ComponentFactory) {
   'use strict';
   /*global describe : false, beforeEach : false, inject : false, it : false, expect : false*/

   describe(module.id, function() {

      var badComponent = {
         template : '<span></span>',
         controller: function() {
         }
      };

      var component = {
         template : '<span></span>',
         controller : ['$scope', function($scope) {
            $scope.test = 'test';
            controllerContext = this;
         }]
      };

      var controllerContext;

      function registerTestComponent(name, component) {
         ComponentFactory.register(name, component);
      }


      it('should fail, when controller is not in array format', function() {
         function f () {
            registerTestComponent('badComponent', badComponent);
         }
         expect(f).toThrow();
      });

      it('should inject generic components into controller context', function() {
         registerTestComponent('test', component);
         var $injector = angular.injector(['ngModule']);
         var $rootScope = $injector.get('$rootScope');
         var $compile = $injector.get('$compile');
         var $scope = $rootScope.$new();
         var element = angular.element('<test></test>');
         $compile(element)($scope);
         $scope.$digest();
         expect($scope.logger).toBeDefined();
         expect($scope.Config).toBeDefined();
      });
   });
});
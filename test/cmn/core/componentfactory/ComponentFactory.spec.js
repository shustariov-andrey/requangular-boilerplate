define([
   'module',
   'angular-mocks',
   'Squire'
], function(module, angular, Squire) {
   'use strict';

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

      var controllerContext, injector = new Squire('squire'), ComponentFactory, deps = ['src/cmn/core/componentfactory/module'];

      function registerTestComponent(name, component) {
         ComponentFactory.register(name, component);
      }

      beforeEach(injector.run(deps, function(_ComponentFactory) {
            ComponentFactory = _ComponentFactory;
         }
      ));

      afterEach(function() {
         injector.clean(deps);
      });


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
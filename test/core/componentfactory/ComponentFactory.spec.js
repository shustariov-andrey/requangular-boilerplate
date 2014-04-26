define([
   'module',
   'angular-mocks',
   'src/core/componentfactory/module'
], function(module, angular, ComponentFactory) {
   'use strict';
   /*global describe : false, beforeEach : false, inject : false, it : false, expect : false*/

   describe(module.id, function() {

      var testComponent = {
         template : '<span></span>',
         controller: function($scope) {
            $scope.test = 'test';
         }
      };

      function registerTestComponent() {
         ComponentFactory.register('test', testComponent);
      }


      it('should fail, when controller is not in array format', function() {
         function f () {
            registerTestComponent();
         }
         expect(f).toThrow();
      });
   });
});
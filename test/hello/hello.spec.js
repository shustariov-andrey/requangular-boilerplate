define(['module', 'angular-mocks', 'src/components/hello/hello'], function(module, angular) {
   'use strict';

   /*global
   describe : false,
   beforeEach : false,
   inject : false,
   it : false,
   expect : false*/

   describe(module.id, function() {

      var $rootScope, $scope, createController;

      beforeEach(function() {
         angular.mock.module('ngModule');
         inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            var $controller = $injector.get('$controller');

            $scope = $rootScope.$new();

            createController = function() {
               return $controller('HelloCtrl', {
                  $scope : $scope
               });
            };

         });
      });

      it('should display "Hello, world" message', function() {
         var controller = createController();
         expect($scope.message).toEqual('Hello, World');
      });
   });
});
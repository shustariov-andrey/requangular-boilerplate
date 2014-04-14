define(['module', 'angular-mocks', 'src/components/hello/hello'], function(module, angular) {
   'use strict';

   /*global describe : false, beforeEach : false, inject : false, it : false, expect : false*/

   describe(module.id, function() {

      it('should display "Hello, world" message', function() {
         var $injector = angular.injector(['ngModule']);
         var $rootScope = $injector.get('$rootScope');
         var $controller = $injector.get('$controller');

         var $scope = $rootScope.$new();
         $controller('HelloCtrl', {$scope : $scope});
         expect($scope.message).toEqual('Hello, World');
      });
   });
});
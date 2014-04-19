define(['module', 'src/ngModule'], function(module, ngModule){
   'use strict';

   return ngModule.controller('HelloCtrl', ['$scope', 'HelloWorldService', function($scope, HelloWorldService){
      $scope.message = HelloWorldService.getMessage();
   }]);
});
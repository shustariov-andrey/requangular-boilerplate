define(['module', 'src/ngModule', 'LoggerFactory'], function(module, ngModule, LoggerFactory){
   'use strict';

   return ngModule.controller('HelloCtrl', ['$scope', function($scope){
      $scope.message = 'Hello, World';
   }]);
});
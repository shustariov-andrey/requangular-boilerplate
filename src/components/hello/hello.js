define(['module', 'src/ngModule'], function(module, ngModule){
   'use strict';

   return ngModule.controller('HelloCtrl', ['$scope', function($scope){
      $scope.message = 'Hello, World';
   }]);
});
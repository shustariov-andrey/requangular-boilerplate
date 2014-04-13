define(['module', 'src/ngModule', 'LoggerFactory'], function(module, ngModule, LoggerFactory){
   'use strict';

   return ngModule.controller('HelloCtrl', ['$scope', function($scope){
      var logger = LoggerFactory.getInstance(module.id);
      logger.info('Hello, World');
      $scope.message = 'Hello, World';
   }]);
});
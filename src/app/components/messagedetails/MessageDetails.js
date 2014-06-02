define([
   'module',
   'src/cmn/core/componentfactory/module',
   'text!./MessageDetails.tpl.html'
], function(module, ComponentFactory, template) {
   'use strict';

   ComponentFactory.register(module.id, {
      template : template,
      controller : ['$scope', 'raMessageService', function($scope, raMessageService) {
         $scope.getActiveMessage = function() {
            return raMessageService.getActiveMessage();
         };
      }]
   });
});
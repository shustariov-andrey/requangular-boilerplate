define([
   'module',
   'src/cmn/core/componentfactory/module',
   'text!./MessageList.tpl.html'
], function(module, ComponentFactory, template) {
   'use strict';

   ComponentFactory.register(module.id, {
      template : template,
      controller : ['$scope', 'raMessageService', function($scope, raMessageService) {
         $scope.getMessages = raMessageService.getMessages;

         $scope.getActiveMessage = function() {
            return raMessageService.getActiveMessage();
         };

         $scope.activate = function(message) {
            raMessageService.setActiveMessage(message);
         };
      }]
   });
});
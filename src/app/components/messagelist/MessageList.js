define([
   'module',
   'src/cmn/core/componentfactory/module',
   'text!./MessageList.tpl.html'
], function(module, ComponentFactory, template) {
   'use strict';

   ComponentFactory.register(module.id, {
      template : template,
      controller : ['$scope', 'MessageService', function($scope, MessageService) {
         $scope.messages = MessageService.getMessages();

         $scope.activate = function(message) {
            MessageService.setActiveMessage(message);
         };
      }]
   });
});
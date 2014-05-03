define([
   'module',
   'src/cmn/core/componentfactory/module',
   'text!./MessageDetails.tpl.html'
], function(module, ComponentFactory, template) {
   'use strict';

   ComponentFactory.register(module.id, {
      template : template,
      controller : ['$scope', 'MessageService', function($scope, MessageService) {
         $scope.getActiveMessage = function() {
            return MessageService.getActiveMessage();
         };
      }]
   });
});
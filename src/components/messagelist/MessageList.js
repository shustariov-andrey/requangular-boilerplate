define([
   'module',
   'src/core/componentfactory/module',
   'text!./MessageList.tpl.html'
], function(module, ComponentFactory, template) {
   'use strict';

   ComponentFactory.register(module.id, {
      template : template,
      controller : ['$scope', function($scope) {
         $scope.messages = [
            {
               title : 'message 1',
               details : 'some additional info'
            },
            {
               title : 'Hello, world',
               details : 'Hello world is output example'
            },
            {
               title : 'Another message',
               details : 'Another description'
            }
         ];
      }]
   });
});
define([
   'module',
   'src/core/componentfactory/module',
   'text!./hello.tpl.html'
], function(module, ComponentFactory, template){
   'use strict';

   ComponentFactory.register(module.id, {
      template : template,
      controller : ['$scope', 'HelloWorldService', function($scope, HelloWorldService) {
         $scope.message = HelloWorldService.getMessage();
      }]
   });
});
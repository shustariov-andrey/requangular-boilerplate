define([
   'module',
   'src/ngModule',
   'src/core/componentfactory/module',
   'text!./Message.tpl.html'
], function(module, ngModule, ComponentFactory, template) {
   'use strict';

   ComponentFactory.register(module.id, {
      template : template,
      controller : [function() {
      }]
   });

   ngModule.config(['$stateProvider', function($stateProvider) {

      $stateProvider
         .state('application.message', {
            url : '/',
            views : {
               list    : {template : '<message-list></message-list>'},
               details : {template : '<message-details></message-details>'}
            }
         });
   }]);
});
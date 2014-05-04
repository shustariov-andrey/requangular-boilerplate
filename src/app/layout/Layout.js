define([
   'src/ngModule'
], function(ngModule) {
   'use strict';

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
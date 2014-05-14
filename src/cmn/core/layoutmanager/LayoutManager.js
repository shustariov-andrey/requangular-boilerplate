define([
   'module',
   'src/ngModule',
   'src/cmn/core/loggerfactory/module',
   'lodash'
], function(module, ngModule, LoggerFactory, _) {
   'use strict';

   var logger = LoggerFactory.getInstance(module.id);

   return {
      register : function(statesArray) {
         ngModule.config(['$stateProvider', function($stateProvider) {
            _.each(statesArray, function(state) {
               logger.trace('Registered state: ' + state.name);
               $stateProvider.state(state.name, state.body);
            });
         }]);
      },
      setDefaultUrl : function(url) {
         ngModule.config(['$urlRouterProvider', function($urlRouterProvider) {
            $urlRouterProvider.otherwise(url);
         }]);
      }
   };
});
define([
   'module',
   'src/cmn/ngModule',
   'src/cmn/core/loggerfactory/module',
   'lodash'
], function(module, ngModule, LoggerFactory, _) {
   'use strict';

   var logger = LoggerFactory.getInstance(module.id);

   ngModule.run(['$rootScope', function($rootScope) {
      _.each(['$stateChangeStart', '$stateChangeSuccess'], function(eventName) {
         $rootScope.$on(eventName, function(event, toState, toParams, fromState, fromParams) {
            logger.trace(event.name, toState.name, toParams, fromState.name, fromParams);
         });
      });

      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
         logger.error(event.name, toState.name, toParams, fromState.name, fromParams, error);
      });

      $rootScope.$on('$stateNotFound', function(event, notFoundState, fromState, fromParams) {
         logger.error(event.name, notFoundState, fromState.name, fromParams);
      });
   }]);

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
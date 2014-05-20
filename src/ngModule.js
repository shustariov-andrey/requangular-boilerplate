define([
   'src/cmn/core/loggerfactory/module',
   'src/cmn/core/config/module',
   'lodash',
   'angular',
   'angular-ui-router',
], function(LoggerFactory, Config, _, angular){
   'use strict';

   var ngModule = angular.module('ngModule', ['ui.router']);
//   var logger = LoggerFactory.getInstance('$log');
//   ngModule.value('$log', logger);

   ngModule.run(['$rootScope', function($rootScope) {
      var logger = LoggerFactory.getInstance('StateManager');

      _.each(['$stateChangeStart', '$stateChangeSuccess'], function(eventName) {
         $rootScope.$on(eventName, function(event, toState, toParams, fromState, fromParams) {
            logger.trace(event.name, toState.name, toParams, fromState.name, fromParams);
         });
      });

      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
         logger.error(event.name, toState.name, toParams, fromState.name, fromParams, error);
      });

      $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
         logger.error(event.name, unfoundState, fromState.name, fromParams);
      });
   }]);

   return ngModule;
});
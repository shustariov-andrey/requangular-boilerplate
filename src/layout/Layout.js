define([
   'module',
   'src/ngModule',
   'src/core/loggerfactory/module',
   'lodash'
], function(module, ngModule, LoggerFactory, _) {
   'use strict';

   var logger = LoggerFactory.getInstance(module.id);

   ngModule.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/");

      $stateProvider
         .state('application', {
            abstract : true
         })
         .state('application.message', {
            url : '/',
            views : {
               list    : {template : '<message-list></message-list>'},
               details : {template : '<message-details></message-details>'}
            }
         });
   }]);

   ngModule.run(['$rootScope', function($rootScope) {

      _.each(['$stateChangeStart', '$stateChangeSuccess'], function(eventName) {
         $rootScope.$on(eventName, function(event, toState, toParams, fromState, fromParams) {
            logger.trace(
               event.name,
                  'to   : ' + toState.name + ' ' + JSON.stringify(toParams),
               (fromState && fromState.name) ? ('from : ' + fromState.name + ' ' + JSON.stringify(fromParams)) : ''
            );
         });
      });

      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
         logger.error(
            event.name,
               'to   : ' + toState.name + ' ' + JSON.stringify(toParams),
            (fromState && fromState.name) ? ('from : ' + fromState.name + ' ' + JSON.stringify(fromParams)) : '',
            'Error: ' + error.name + '\n' + error.message
         );
      });

      $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
         logger.error(
            event.name,
               'to   : ' + unfoundState.to + ' ' + JSON.stringify(unfoundState.toParams),
            (fromState && fromState.name) ? ('from : ' + fromState.name + ' ' + JSON.stringify(fromParams)) : ''
         );
      });
   }]);
});
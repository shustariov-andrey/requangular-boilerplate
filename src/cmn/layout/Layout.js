define([
   'module',
   'src/ngModule',
   'src/cmn/core/loggerfactory/module',
   'src/cmn/core/layoutmanager/module',
   'lodash'
], function(module, ngModule, LoggerFactory, LayoutManager, _) {
   'use strict';

   var logger = LoggerFactory.getInstance(module.id);

   LayoutManager.register([{
      name : 'application',
      body : {
         abstract : true
      }
   }]);

   LayoutManager.setDefaultUrl('/');

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
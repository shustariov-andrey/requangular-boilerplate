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

   ngModule.run(['$rootScope', function($rootScope) {

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
});
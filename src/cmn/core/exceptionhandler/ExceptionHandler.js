define([
   'module',
   'src/cmn/ngModule',
   'src/cmn/core/loggerfactory/module'
], function(module, ngModule, LoggerFactory) {
   'use strict';

   ngModule.factory('$exceptionHandler', [function() {
      var logger = LoggerFactory.getInstance(module.id);
      return function(exception, cause) {
         exception.message += ' (caused by "' + cause + '")';
         logger.error(exception.message, exception.stack);
      };
   }]);
});
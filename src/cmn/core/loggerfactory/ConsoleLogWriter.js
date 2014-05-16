define(function() {
   'use strict';

   var logLevelToConsoleMethodMap = {
      all   : 'debug',
      trace : 'debug',
      debug : 'debug',
      info  : 'info',
      warn  : 'warn',
      error : 'error'
   };

   var defaultConsoleMethod = 'log';

   return {
      /**
       *
       * @param {LogLevel} logLevel
       * @param {String} message
       */
      write : function (logLevel, message) {
         var consoleMethodName = logLevelToConsoleMethodMap[logLevel.key] in window.console ?
            logLevelToConsoleMethodMap[logLevel.key] : defaultConsoleMethod;
         return window.console[consoleMethodName].apply(window.console, message);
      }
   };
});
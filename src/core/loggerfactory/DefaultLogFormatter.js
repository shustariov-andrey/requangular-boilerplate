define(function() {
   'use strict';

   return {
      /**
       *
       * @param {string} message
       * @param {LogLevel} logLevel
       * @param {string} componentName
       * @returns {string} formatted string of log message
       */
      format : function(message, logLevel, componentName) {
         var date = new Date();
         var now = date.toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0] + ':' + ('000' + date.getMilliseconds()).slice(-3);
         return now + ' [' + logLevel.label + '] - [' + componentName + '] - ' + message;
      }
   };
});
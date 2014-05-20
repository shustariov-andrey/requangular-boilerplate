define(function() {
   'use strict';

   return {
      /**
       *
       * @param {Array<string>} messages
       * @param {LogLevel} logLevel
       * @param {string} componentName
       * @returns {Array<string>} formatted string of log message
       */
      format : function(messages, logLevel, componentName) {
         var date = new Date();
         var now = date.toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0] + ':' + ('000' + date.getMilliseconds()).slice(-3);
         componentName = componentName ? componentName.replace(/\//g, '.') : '';
         componentName = componentName.replace(/^src\./, '');
         return [now, '[' + logLevel.label + ']', '[' + componentName + ']'].concat(messages);
      }
   };
});
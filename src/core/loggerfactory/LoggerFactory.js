define(['./LogLevel', './ConsoleLogWriter', './DefaultLogFormatter'], function(LogLevel, DefaultLogWriter, DefaultLogFormatter) {
   'use strict';

   var logWriter = DefaultLogWriter, logFormatter = DefaultLogFormatter, logLevel = LogLevel.ERROR;

   function prepareLogFn (className, level) {

      function enhancedLogFn () {
         var args = Array.prototype.slice.call(arguments);
         var argsJoined = args.join('\n\t');
         var message = logFormatter.format(argsJoined, level, className);

         return logWriter.write(logLevel, message);
      }

      return level.value <= logLevel.value ? enhancedLogFn : function(){};
   }

   /**
    * Generates class-specific logger instance with classname
    * only
    *
    * @param {String} module
    *
    * @returns Object with different log level methods
    */
   function getInstance (module) {
      var logger = {};
      for (var level in LogLevel) {
         if (LogLevel.hasOwnProperty(level)) {
            logger[LogLevel[level].key] = prepareLogFn(module, LogLevel[level]);
         }
      }
      return logger;
   }

   return {
      getInstance : getInstance,
      setLogWriter : function(_logWriter) {
         logWriter = _logWriter;
      },
      /**
       *
       * @param {LogLevel} _logLevel
       */
      setLogLevel : function(_logLevel) {
         logLevel = _logLevel;
      },

      setLogFormatter : function(_logFormatter) {
         logFormatter = _logFormatter;
      }
   };
});

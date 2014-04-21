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
    * @returns Object wrapper facade to $log
    */
   function getInstance (module) {
      module = (module) ? module.replace(/\//g, '.') : '';

      return {
         trace : prepareLogFn(module, LogLevel.TRACE),
         debug : prepareLogFn(module, LogLevel.DEBUG),
         info  : prepareLogFn(module, LogLevel.INFO),
         warn  : prepareLogFn(module, LogLevel.WARN),
         error : prepareLogFn(module, LogLevel.ERROR)
      };
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

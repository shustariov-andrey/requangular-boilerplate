define(['./LogLevel', './ConsoleLogWriter', './DefaultLogFormatter'], function(LogLevel, DefaultLogWriter, DefaultLogFormatter) {
   'use strict';

   var logWriter = DefaultLogWriter, logFormatter = DefaultLogFormatter, logLevel = LogLevel.ERROR;

   /**
    * Partial application to pre-capture a logger function
    */
   function prepareLogFn (logWriter, className, level) {
      /**
       * Invoke the specified `logFn` with the supplant
       * functionality...
       */
      function enhancedLogFn () {
         var args = Array.prototype.slice.call(arguments);
         var argsJoined = args.join('\n\t');
         var message = logFormatter.format(argsJoined, level, className);

         return logWriter.write(logLevel, message);
      }

      return level.value <= logLevel.value ? enhancedLogFn : function(){};
   }

   /**
    * Support to generate class-specific logger instance with classname
    * only
    *
    * @param {String} module
    *
    * @returns Object wrapper facade to $log
    */
   function getInstance (module) {
      module = (module) ? module.replace(/\//g, '.') : '';

      return {
         trace : prepareLogFn(logWriter, module, LogLevel.TRACE),
         debug : prepareLogFn(logWriter, module, LogLevel.DEBUG),
         info  : prepareLogFn(logWriter, module, LogLevel.INFO),
         warn  : prepareLogFn(logWriter, module, LogLevel.WARN),
         error : prepareLogFn(logWriter, module, LogLevel.ERROR)
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

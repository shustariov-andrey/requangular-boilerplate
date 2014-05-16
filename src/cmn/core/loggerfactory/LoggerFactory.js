define([
   'src/cmn/core/config/module',
   './LogLevel',
   './ConsoleLogWriter',
   './DefaultLogFormatter'
], function(Config, LogLevel, DefaultLogWriter, DefaultLogFormatter) {
   'use strict';

   var logWriter = DefaultLogWriter,
      logFormatter = DefaultLogFormatter,
      logLevel;

   function prepareLogFn (className, level) {

      function enhancedLogFn () {
         var args = Array.prototype.slice.call(arguments);
//         var argsJoined = args.join('\n\t');
         var message = logFormatter.format(args, level, className);

         return logWriter.write(level, message);
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

   /**
    * @param {LogLevel|string} _logLevel
    */
   function setLogLevel(_logLevel) {
      if (typeof _logLevel === 'string') {
         if (LogLevel.hasOwnProperty(_logLevel)) {
            _logLevel = LogLevel[_logLevel];
         } else {
            throw new Error('Unknown log level "' + _logLevel + '"');
         }
      }
      logLevel = _logLevel;
   }

   setLogLevel(Config.getConfig('Core.LogLevel') || 'TRACE');

   return {
      getInstance : getInstance,

      setLogWriter : function(_logWriter) {
         logWriter = _logWriter;
      },

      setLogLevel : setLogLevel,

      setLogFormatter : function(_logFormatter) {
         logFormatter = _logFormatter;
      }
   };
});

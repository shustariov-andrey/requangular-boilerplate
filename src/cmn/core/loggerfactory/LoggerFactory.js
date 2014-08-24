define([
   'src/cmn/core/config/module',
   './LogLevel',
   './DefaultLogFormatter',
   './ConsoleLogWriter',
   './HttpLogWriter'
], function(Config, LogLevel, DefaultLogFormatter, ConsoleLogWriter, HttpLogWriter) {
   'use strict';

   var logWriter = HttpLogWriter,
      logFormatter = DefaultLogFormatter,
      logLevel;

   function prepareLogFn (className, level) {

      function enhancedLogFn () {
         var args = Array.prototype.slice.call(arguments);
         var message = logFormatter.format(args, level, className);

         return logWriter.write(level, message);
      }

      return (level.value <= logLevel.value && logLevel.key !== 'disabled') ? enhancedLogFn : function(){};
   }

   /**
    * Generates class-specific logger instance with class name
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

   function setLogWriter(_logWriter) {
      switch (_logWriter) {
         case 'Console':
            logWriter = ConsoleLogWriter;
            break;
         case 'Http':
            logWriter = HttpLogWriter;
            break;
         default :
            throw new Error('Unknown Log Writer ' + _logWriter);
      }
   }

   setLogLevel(Config.getConfig('Core.LogLevel') || 'TRACE');
   setLogWriter(Config.getConfig('Core.LogWriter') || 'Console');

   /**
    *
    * @class LoggerFactory
    */
   var LoggerFactory = {
      getInstance : getInstance,

      setLogWriter : function(_logWriter) {
         logWriter = _logWriter;
      },

      setLogLevel : setLogLevel,

      setLogFormatter : function(_logFormatter) {
         logFormatter = _logFormatter;
      }
   };

   return LoggerFactory;
});

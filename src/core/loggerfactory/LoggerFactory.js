define(['moment', './supplant'], function(moment, supplant) {
   'use strict';

   function initDefaultLogWriter () {
      logWriter = window.console.log;
      logWriterContext = window.console;
   }

   var LogLevel = {
      ALL   : {value : Number.MAX_VALUE, label : 'TRACE'},
      TRACE : {value : 400000,           label : 'TRACE'},
      DEBUG : {value : 300000,           label : 'DEBUG'},
      INFO  : {value : 200000,           label : 'INFO '},
      WARN  : {value : 100000,           label : 'WARN '},
      ERROR : {value : Number.MIN_VALUE, label : 'ERROR'}
   };

   var logWriter, logWriterContext, logLevel = LogLevel.ERROR;

   /**
    * Partial application to pre-capture a logger function
    */
   function prepareLogFn (logFn, className, level) {
      /**
       * Invoke the specified `logFn` with the supplant
       * functionality...
       */
      function enhancedLogFn () {
         var args = Array.prototype.slice.call(arguments);
         var now = moment().format('HH:mm:ss:SSS');

         var argsJoined = args.join('\n\t');

         // prepend a timestamp and optional classname to the original
         // output message
         var logArg = supplant('{0} [{1}] - [{2}] - {3}', [
            now, level.label, className, argsJoined
         ]);

         return level.value <= logLevel.value ? logWriter.call(logWriterContext, logArg) : undefined;
      }

      return enhancedLogFn;
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
      if (!logWriter) {
         initDefaultLogWriter();
      }
      module = (module) ? module.replace(/\//g, '.') : '';

      return {
         trace : prepareLogFn(logWriter, module, LogLevel.TRACE),
         debug : prepareLogFn(logWriter, module, LogLevel.DEBUG),
         info  : prepareLogFn(logWriter, module, LogLevel.INFO),
         warn  : prepareLogFn(logWriter, module, LogLevel.WARN),
         error : prepareLogFn(logWriter, module, LogLevel.ERROR)
      };
   }

   function init (options) {
      if ('logWriter' in options) {
         logWriter = options.logWriter;
      }
      if ('logWriterContext' in options) {
         logWriterContext = options.logWriterContext;
      }
      if ('logLevel' in options) {
         logLevel = LogLevel[options.logLevel];
         if (!logLevel) {
            throw new Error('Unknown logLevel: "' + options.logLevel + '"');
         }
      }
   }

   return {
      getInstance : getInstance,
      init : init
   };
});

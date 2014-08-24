define([
   'module',
   'Squire'
], function(module, Squire) {
   'use strict';

   describe(module.id, function() {
      var loggerInstance, injector = new Squire('squire'), LogLevel, LoggerFactory, deps = [
         'src/cmn/core/loggerfactory/LoggerFactory',
         'src/cmn/core/loggerfactory/LogLevel'
      ];

      var testLogWriter = {
         write : function(logLevel, message) {
            return message;
         }
      };

      beforeEach(injector.run(deps, function(_LoggerFactory, _LogLevel) {
            LoggerFactory = _LoggerFactory;
            LogLevel = _LogLevel;
         }
      ));

      afterEach(function() {
         injector.clean(deps);
      });

      it('should consider log level', function() {
         LoggerFactory.setLogLevel(LogLevel.INFO);
         LoggerFactory.setLogWriter(testLogWriter);
         loggerInstance = LoggerFactory.getInstance('test/module');
         var result = loggerInstance.info('test_message');
         expect(result).toBeDefined();
         result = loggerInstance.debug('test_message');
         expect(result).toBeUndefined();
         result = loggerInstance.warn('test_message');
         expect(result).toBeDefined();
      });

      it('should throw error, when log level is invalid', function() {
         function f() {
            LoggerFactory.setLogLevel('INVALID_LOG_LEVEL');
         }
         expect(f).toThrow();
      });

      it('should allow custom log message formatting', function() {
         LoggerFactory.setLogLevel(LogLevel.INFO);
         LoggerFactory.setLogWriter(testLogWriter);
         LoggerFactory.setLogFormatter({
            format : function(message, logLevel, componentName) {
               return logLevel.label + 'II' + componentName + 'II' + message;
            }
         });
         loggerInstance = LoggerFactory.getInstance('test/module');
         var result = loggerInstance.info('test_message');
         expect(result).toMatch(/^INFO\sIItest\/moduleIItest_message$/);
      });
   });
});
define(['module', 'src/core/loggerfactory/module'], function(module, LoggerFactory) {
   'use strict';
   /*global describe : false, beforeEach : false, inject : false, it : false, expect : false*/

   describe(module.id, function() {
      var loggerInstance;

      var testLogWriter = function(message) {
         return message;
      };

      it('should print formatted log message', function() {
         LoggerFactory.init({logWriter : testLogWriter});
         loggerInstance = LoggerFactory.getInstance('test/module');
         var result = loggerInstance.error('test_message');
         expect(result).toMatch(/^\d{2}:\d{2}:\d{2}:\d{3}\s\[.{5}\]\s-\s\[test\.module\]\s-\stest_message$/);
      });

      it('should consider log level', function() {
         LoggerFactory.init({logWriter : testLogWriter, logLevel : 'INFO'});
         loggerInstance = LoggerFactory.getInstance('test/module');
         var result = loggerInstance.info('test_message');
         expect(result).toBeDefined();
         result = loggerInstance.debug('test_message');
         expect(result).toBeUndefined();
         result = loggerInstance.warn('test_message');
         expect(result).toBeDefined();
      });

      it('should check log level for existance', function() {
         function f () {
            LoggerFactory.init({logWriter : testLogWriter, logLevel : 'UNKNOWN'});
         }
         expect(f).toThrow();
      });
   });
});
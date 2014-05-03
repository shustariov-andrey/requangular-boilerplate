define([
   'module',
   'src/cmn/core/loggerfactory/DefaultLogFormatter',
   'src/cmn/core/loggerfactory/LogLevel'
], function(module, DefaultLogFormatter, LogLevel) {
   'use strict';
   /*global describe : false, beforeEach : false, inject : false, it : false, expect : false*/

   describe(module.id, function() {
      var metaMessageRegex = '^\\d{2}:\\d{2}:\\d{2}:\\d{3}\\s\\[.{5}\\]\\s-\\s\\[test\\.module\\]\\s-\\s';

      it('should print formatted log message', function() {
         var result = DefaultLogFormatter.format('test_message', LogLevel.ERROR, 'test.module');
         expect(result).toMatch(new RegExp(metaMessageRegex + 'test_message$'));
      });
   });
});
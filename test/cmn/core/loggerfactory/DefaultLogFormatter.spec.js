define([
   'module',
   'src/cmn/core/loggerfactory/DefaultLogFormatter',
   'src/cmn/core/loggerfactory/LogLevel'
], function(module, DefaultLogFormatter, LogLevel) {
   'use strict';
   /*global describe : false, beforeEach : false, inject : false, it : false, expect : false*/

   describe(module.id, function() {
      var metaMessageRegex = '^\\d{2}:\\d{2}:\\d{2}:\\d{3}$';

      it('should print formatted log message', function() {
         var result = DefaultLogFormatter.format('test_message', LogLevel.ERROR, 'test.module');
         expect(result[0]).toMatch(new RegExp(metaMessageRegex));
         expect(result.slice(1)).toEqual(['[ERROR]', '[test.module]', 'test_message']);
      });
   });
});
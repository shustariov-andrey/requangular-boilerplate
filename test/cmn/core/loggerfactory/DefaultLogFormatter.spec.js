define([
   'module',
   'Squire'
], function(module, Squire) {
   'use strict';

   describe(module.id, function() {
      var metaMessageRegex = '^\\d{2}:\\d{2}:\\d{2}:\\d{3}$', injector = new Squire('squire'), LogLevel, DefaultLogFormatter;

      beforeEach(injector.run([
            'src/cmn/core/loggerfactory/DefaultLogFormatter',
            'src/cmn/core/loggerfactory/LogLevel'
         ], function(_DefaultLogFormatter, _LogLevel) {
            DefaultLogFormatter = _DefaultLogFormatter;
            LogLevel = _LogLevel;
         }
      ));

      afterEach(function() {
         injector.remove();
      });

      it('should print formatted log message', function() {
         var result = DefaultLogFormatter.format('test_message', LogLevel.ERROR, 'test.module');
         expect(result[0]).toMatch(new RegExp(metaMessageRegex));
         expect(result.slice(1)).toEqual(['[ERROR]', '[test.module]', 'test_message']);
      });
   });
});
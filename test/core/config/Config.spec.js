define([
   'module',
   'src/core/config/module'
], function(module, Config) {
   'use strict';
   /*global describe : false, beforeEach : false, inject : false, it : false, expect : false, waitsFor : false, runs : false*/

   describe(module.id, function () {

      it('should read test configuration', function() {
         var initComplete = false;

         runs(function() {
            Config.init('test/fixtures/config/config.json', function() {
               initComplete = true;
            });
         });

         waitsFor(function() {
            return initComplete;
         });

         runs(function() {
            expect(Config.getConfig().Test).toBeDefined();
            expect(Config.getConfig().Test.SubItem).toEqual(42);
            expect(Config.getConfig().Test.AnotherOne).toEqual(42);
            expect(Config.getConfig().NotExisted).toBeUndefined();
         });
      });

      it('should stub missing configuration', function() {
         var initComplete = false, result, defaultResult = Config.getConfig();

         runs(function() {
            Config.init('test/fake/config.json', function(_result) {
               result = _result;
               initComplete = true;
            });
         });

         waitsFor(function() {
            return initComplete;
         });

         runs(function() {
            expect(result).toEqual(defaultResult);
         });
      });

      it('should parse config expressions', function() {
         var initComplete = false;

         runs(function() {
            Config.init('test/fixtures/config/config.json', function() {
               initComplete = true;
            });
         });

         waitsFor(function() {
            return initComplete;
         });

         runs(function() {
            expect(Config.getConfig('Test.SubItem')).toEqual(42);
            expect(Config.getConfig('Test.SubSubItem.Value')).toEqual(10);
            expect(Config.getConfig('Test.SubSubItem.Value1')).toBeUndefined();
         });
      });
   });
});
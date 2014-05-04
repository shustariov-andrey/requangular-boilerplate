define([
   'module',
   'src/cmn/core/config/module'
], function(module, Config) {
   'use strict';
   /*global describe : false, beforeEach : false, inject : false, it : false, expect : false, waitsFor : false, runs : false*/

   describe(module.id, function () {

      it('should read test configuration', function() {
         var initComplete = false;

         runs(function() {
            Config.init(function() {
               initComplete = true;
            }, 'test/fixtures/config/config.json');
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
            Config.init(function(_result) {
               result = _result;
               initComplete = true;
            }, 'test/fake/config.json');
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
            Config.init(function() {
               initComplete = true;
            }, 'test/fixtures/config/config.json');
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

      it('should override config with more prioritized sources', function() {
         var initComplete = false;

         runs(function() {
            Config.init(function() {
               initComplete = true;
            }, 'test/fixtures/config/overriding-config.json');
         });

         waitsFor(function() {
            return initComplete;
         });

         runs(function() {
            expect(Config.getConfig('Core.LogLevel')).toEqual('DEBUG');
         });
      });

      it('should parse url parameters', function() {
         var initComplete = false;

         runs(function() {
            Config.init(function() {
               initComplete = true;
            }, 'test/fixtures/config/config.json', {
               search : '?config.Test.TestValue=42&config.Test.TestValue1=true&config.Test.TestValue2=false'
            });
         });

         waitsFor(function() {
            return initComplete;
         });

         runs(function() {
            expect(Config.getConfig('Test.TestValue')).toEqual(42);
            expect(Config.getConfig('Test.TestValue2')).toEqual(false);
            expect(Config.getConfig('Test.TestValue1')).toEqual(true);
         });
      });

      it('should allow to set custom config', function() {
         Config.setConfig({test : 'config'});
         expect(Config.getConfig('test')).toEqual('config');
      });
   });
});
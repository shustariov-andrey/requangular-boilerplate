define([
   'module',
   'Squire'
], function(module, Squire) {
   'use strict';

   describe(module.id, function () {

      var injector = new Squire('squire'), Config, deps = ['src/cmn/core/config/module'];

      beforeEach(injector.run(deps, function(_Config) {
            Config = _Config;
         }
      ));

      afterEach(function() {
         injector.clean(deps);
      });

      afterEach(function () {
         Config.setConfig({});
      });

      it('should read test configuration', function(done) {

         Config.init(function() {
            expect(Config.getConfig().Test).toBeDefined();
            expect(Config.getConfig().Test.SubItem).toEqual(42);
            expect(Config.getConfig().Test.AnotherOne).toEqual(42);
            expect(Config.getConfig().NotExisted).toBeUndefined();
            done();
         }, 'test/fixtures/config/config.json');
      });

      it('should stub missing configuration', function(done) {
         Config.init(function(result) {
            expect(result.IgnoreConfigFile).toEqual(false);
            done();
         }, 'test/fake/config.json');
      });

      it('should parse config expressions', function(done) {
         Config.init(function() {
            expect(Config.getConfig('Test.SubItem')).toEqual(42);
            expect(Config.getConfig('Test.SubSubItem.Value')).toEqual(10);
            expect(Config.getConfig('Test.SubSubItem.Value1')).toBeUndefined();
            done();
         }, 'test/fixtures/config/config.json');
      });

      it('should override config with more prioritized sources', function(done) {
         Config.init(function() {
            expect(Config.getConfig('Core.LogLevel')).toEqual('DEBUG');
            done();
         }, 'test/fixtures/config/overriding-config.json');

      });

      it('should parse url parameters', function(done) {
         Config.init(function() {
            expect(Config.getConfig('Test.TestValue')).toEqual(42);
            expect(Config.getConfig('Test.TestValue2')).toEqual(false);
            expect(Config.getConfig('Test.TestValue1')).toEqual(true);
            expect(Config.getConfig('Test.SubItem')).toEqual(41);
            done();
         }, 'test/fixtures/config/config.json', {
            search : '?config.Test.TestValue=42&config.Test.TestValue1=true&config.Test.TestValue2=false&config.Test.SubItem=41'
         });
      });

      it('should allow to set custom config', function() {
         Config.setConfig({test : 'config'});
         expect(Config.getConfig('test')).toEqual('config');
      });

      it('should ignore config file if IgnoreConfigFile is set to true', function(done) {
         Config.init(function() {
            expect(Config.getConfig('Test')).toBeUndefined();
            done();
         }, 'test/fixtures/config/config.json', {
            search : '?config.IgnoreConfigFile=true'
         });
      });
   });
});
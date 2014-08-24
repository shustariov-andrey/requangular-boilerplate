define([
   'module',
   'angular-mocks',
   'Squire'
], function(module, angular, Squire) {
   'use strict';

   describe(module.id, function() {

      var injector = new Squire('squire'), ServiceFactory, deps = ['src/cmn/core/servicefactory/module'];

      beforeEach(injector.run(deps, function(_ServiceFactory) {
            ServiceFactory = _ServiceFactory;
         }
      ));

      afterEach(function() {
         injector.clean(deps);
      });

      beforeEach(angular.mock.module('ngModule'));

      function registerTestService (service) {
         ServiceFactory.register('TestService', service);
      }

      describe('test service', function() {

         function Service() {
            this.testMethod = function() {
               return 'test';
            };
         }

         beforeEach(function() {
            registerTestService([Service]);
         });

         var TestService;

         beforeEach(angular.mock.inject(function(_TestService_){
            TestService = _TestService_;
         }));

         it('should register angular services', function() {
            expect(TestService).toBeDefined();
            expect(typeof TestService.testMethod).toEqual('function');
            expect(TestService.testMethod()).toEqual('test');
         });
      });

      it('should fail, when service is not in array format', function() {
         function f () {
            registerTestService(function(){});
         }
         expect(f).toThrow();
      });

      it('should fail, when service array has no function', function() {
         function f () {
            registerTestService(['dep1', 'dep2']);
         }
         expect(f).toThrow();
      });
   });
});
define([
   'module',
   'angular-mocks',
   'Squire'
], function(module, angular, Squire) {
   'use strict';
   /*global describe : false, beforeEach : false, afterEach : false, it : false, expect : false, spyOn : false*/

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

         var spyObj = {
            called : function() {}
         };

         function Service() {
            this.testMethod = function() {
               return 'test';
            };

            this.onInit = function(){
               spyObj.called();
            };
         }

         beforeEach(function() {
            registerTestService([Service]);

            spyOn(spyObj, 'called');
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

         it('should call onInit after initialization', function () {
            expect(spyObj.called).toHaveBeenCalled();
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

      it('getRegistry() should return registry array', function () {
         expect(ServiceFactory.getRegistry() instanceof Array).toBeTruthy();
      });
   });
});
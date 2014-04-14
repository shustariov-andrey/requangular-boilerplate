define(['module', 'angular-mocks', 'ServiceFactory'], function(module, angular, ServiceFactory) {
   'use strict';
   /*global describe : false, beforeEach : false, inject : false, it : false, expect : false*/

   describe(module.id, function() {

      beforeEach(function() {
         ServiceFactory.register('test_service', [function() {
            this.testMethod = function() {
               return 'test';
            };
         }]);
      });

      it('should register angular services', function() {

         var $injector =  angular.injector(['ngModule']);
         var service = $injector.get('test_service');

         expect(service).toBeDefined();
         expect(typeof service.testMethod).toEqual('function');
         expect(service.testMethod()).toEqual('test');
      });

      it('should inject logger into services', function() {
         var $injector =  angular.injector(['ngModule']);
         var service = $injector.get('test_service');

         expect(service.logger).toBeDefined();
      });
   });
});
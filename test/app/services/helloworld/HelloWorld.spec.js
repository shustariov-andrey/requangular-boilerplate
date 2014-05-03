define([
   'module',
   'angular-mocks',
   'src/app/services/helloworld/module'
], function(module, angular) {
   'use strict';

   /*global describe : false, beforeEach : false, inject : false, it : false, expect : false*/

   describe(module.id, function() {

      it('should return "Hello, world" message', function() {
         var $injector = angular.injector(['ngModule']);
         var HelloWorldService = $injector.get('HelloWorldService');

         expect(HelloWorldService.getMessage()).toEqual('Hello, World');
      });
   });
});
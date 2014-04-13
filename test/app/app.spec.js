define(['module', 'angular-mocks', 'src/app/app'], function(module, angular, app)  {
   'use strict';

   /*global
     describe : false,
     beforeEach : false,
     inject : false,
     it : false,
     expect : false*/

   describe(module.id, function() {
      it('should map routes to controllers', function() {
         angular.mock.module('ngModule');

         inject(function($route) {

            // otherwise redirect to
            expect($route.routes[null].redirectTo).toEqual('/hello');
         });
      });
   });
});
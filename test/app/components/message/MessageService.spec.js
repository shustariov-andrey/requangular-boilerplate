define([
   'module',
   'angular',
   'src/app/components/message/MessageService',
   'src/app/domain/module',
], function(module, angular) {
   'use strict';
   /*global describe : false, beforeEach : false, inject : false, it : false, expect : false*/

   describe(module.id, function() {
      var service;
      beforeEach(function() {
         var $injector = angular.injector(['ngModule']);
         service = $injector.get('MessageService');
      });

      it('should contain 3 messages at start', function() {
         expect(service.getMessages().length).toEqual(3);
      });

      it('should activate first message at start', function() {
         expect(service.getActiveMessage()).toEqual(service.getMessages()[0]);
      });

      it('should allow to set active message', function() {
         var messages = service.getMessages();
         service.setActiveMessage(messages[1]);
         expect(service.getActiveMessage()).toEqual(service.getMessages()[1]);
      });
   });
});
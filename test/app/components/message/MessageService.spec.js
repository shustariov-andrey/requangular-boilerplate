define([
   'module',
   'angular-mocks',
   'Squire'
], function(module, angular, Squire) {
   'use strict';
   /*global describe : false, beforeEach : false, inject : false, it : false, expect : false, xit : false, afterEach : false*/

   describe(module.id, function() {
      var service, injector = new Squire('squire'), deps = [
         'src/cmn/augmenters/module',
         'src/app/components/message/MessageService',
         'src/app/domain/module'
      ];

      beforeEach(injector.run(deps, angular.noop));

      afterEach(function() {
         injector.clean(deps);
      });

      beforeEach(angular.mock.module('ngModule'));

      beforeEach(angular.mock.inject(function(_MessageService_) {
         service = _MessageService_;
      }));

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
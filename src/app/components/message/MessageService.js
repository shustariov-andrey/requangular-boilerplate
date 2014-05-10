define([
   'module',
   'src/cmn/core/servicefactory/module'
], function(module, ServiceFactory) {
   'use strict';

   /**
    * Simple service for communication between MessageList and MessageDetails
    * components - Mediator
    */
   ServiceFactory.register(module.id, [function() {

      var messages = this.EntityRegistry.create('Message', [
         {
            title : 'message 1',
            message : 'some additional info'
         },
         {
            title : 'Hello, world',
            message : 'Hello world is output example'
         },
         {
            title : 'Another message',
            message : 'Another description'
         }
      ]);

      var activeMessage = messages[0];

      this.getMessages = function() {
         return messages;
      };

      this.setActiveMessage = function(_activeMessage) {
         activeMessage = _activeMessage;
      };

      this.getActiveMessage = function() {
         return activeMessage;
      };
   }]);
});
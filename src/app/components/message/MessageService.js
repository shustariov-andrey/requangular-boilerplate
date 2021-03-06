define([
   'module',
   'src/cmn/core/servicefactory/module',
   'src/cmn/core/entityregistry/module'
], function(module, ServiceFactory, EntityRegistry) {
   'use strict';

   /**
    * Simple service for communication between MessageList and MessageDetails
    * components - Mediator
    */
   ServiceFactory.register(module.id, [function() {

      var activeMessage, messages = EntityRegistry.create('Message', [
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

      this.getMessages = function() {
         return messages;
      };

      this.setActiveMessage = function(_activeMessage) {
         activeMessage = _activeMessage;
      };

      this.getActiveMessage = function() {
         if (!activeMessage && messages.length) {
            activeMessage = messages[0];
         }
         return activeMessage;
      };
   }]);
});
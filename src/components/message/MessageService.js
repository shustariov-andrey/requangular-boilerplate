define([
   'module',
   'src/core/ServiceFactory/module'
], function(module, ServiceFactory) {
   'use strict';

   ServiceFactory.register(module.id, [function() {

      var messages = [
         {
            title : 'message 1',
            details : 'some additional info'
         },
         {
            title : 'Hello, world',
            details : 'Hello world is output example'
         },
         {
            title : 'Another message',
            details : 'Another description'
         }
      ];

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
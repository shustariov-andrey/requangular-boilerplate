define([
   'src/cmn/core/entityregistry/module'
], function(EntityRegistry) {
   'use strict';

   EntityRegistry.register({
      name : 'Message',
      prototype : function Message() {
      },
      fields : ['message', 'title']
   });
});
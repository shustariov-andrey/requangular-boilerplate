define([
   'src/cmn/core/entityregistry/module'
], function(EntityRegistry) {
   'use strict';

   EntityRegistry.register({
      name : 'Message',
      fields : [{
         name : 'message',
         options : {
            required : true
         }
      }, {
         name : 'title',
         options : {
            required : true
         }
      }]
   });
});
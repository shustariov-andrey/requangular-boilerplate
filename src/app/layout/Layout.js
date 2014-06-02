define([
   'src/cmn/core/layoutmanager/module'
], function(LayoutManager) {
   'use strict';

   LayoutManager.register([{
      name : 'message',
      body : {
         url : '/',
         views : {
            list : {
               template : '<ra-message-list></ra-message-list>'
            },
            details : {
               template : '<ra-message-details></ra-message-details>'
            }
         }
      }
   }]);

   LayoutManager.setDefaultUrl('/');
});
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
               template : '<message-list></message-list>'
            },
            details : {
               template : '<message-details></message-details>'
            }
         }
      }
   }]);

   LayoutManager.setDefaultUrl('/');
});
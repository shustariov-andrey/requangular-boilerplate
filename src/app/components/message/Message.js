define([
   'module',
   'src/cmn/core/componentfactory/module',
   'text!./Message.tpl.html'
], function(module, ComponentFactory, template) {
   'use strict';

   ComponentFactory.register(module.id, {
      template : template,
      controller : [function() {
      }]
   });


});
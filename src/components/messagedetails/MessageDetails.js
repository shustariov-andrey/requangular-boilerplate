define([
   'module',
   'src/core/componentfactory/module',
   'text!./MessageDetails.tpl.html'
], function(module, ComponentFactory, template) {
   'use strict';

   ComponentFactory.register(module.id, {
      template : template,
      controller : [function() {
      }]
   });
});
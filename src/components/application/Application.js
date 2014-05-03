define([
   'module',
   'src/core/componentfactory/module',
   'text!./Application.tpl.html'
], function(module, ComponentFactory, template) {
   'use strict';

   /**
    * This component is common for all applications
    */
   ComponentFactory.register(module.id, {
      template : template,
      controller : [function() {
      }]
   });
});
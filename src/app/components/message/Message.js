define([
   'module',
   'src/cmn/core/componentfactory/module',
   'text!./Message.tpl.html',
   'ui-utils'
], function(module, ComponentFactory, template) {
   'use strict';

   ComponentFactory.register(module.id, {
      template : template,
      controller : [function() {
      }]
   });

   ComponentFactory.addAngularModule('ui.utils');
});
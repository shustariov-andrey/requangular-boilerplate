define([
   'module',
   'src/cmn/core/componentfactory/module',
   'text!./Message.tpl.html',
   'src/ngModule',
   'ui-utils'
], function(module, ComponentFactory, template, ngModule) {
   'use strict';

   ComponentFactory.register(module.id, {
      template : template,
      controller : [function() {
      }]
   });

   ngModule.requires.push('ui.utils');
});
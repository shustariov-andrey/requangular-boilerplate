define([
   'src/ngModule',
   'ui-utils',
   './components/module',
   './services/module',
   './domain/module',
   './layout/module'
], function(ngModule) {
   'use strict';

   ngModule.requires.push('ui.utils');
});
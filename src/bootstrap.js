requirejs([
   'domReady!',
   'angular',
   'src/ngModule',
   'src/core/module',
   'src/components/module'
], function(document, angular, app){
   'use strict';
   angular.bootstrap(document, [app.name]);
});
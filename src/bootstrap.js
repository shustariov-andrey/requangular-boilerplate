requirejs([
   'domReady!',
   'src/core/config/module'
], function(document, Config){
   'use strict';

   Config.init(function() {
      requirejs([
         'angular',
         'src/ngModule',
         'src/core/module',
         'src/services/module',
         'src/components/module',
         'src/layout/module'
      ],function(angular, app) {
         angular.bootstrap(document, [app.name]);
      });
   });
});
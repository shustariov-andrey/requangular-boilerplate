requirejs([
   'domReady!',
   'src/cmn/core/config/module'
], function(document, Config){
   'use strict';

   Config.init(function() {
      requirejs([
         'angular',
         'src/ngModule',
         'src/cmn/module',
         'src/app/module'
      ],function(angular, app) {
         angular.bootstrap(document, [app.name]);
      });
   });
});
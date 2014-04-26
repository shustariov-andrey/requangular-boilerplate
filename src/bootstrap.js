requirejs([
   'domReady!',
   'src/core/config/module'
], function(document, Config){
   'use strict';

   Config.init('config/config.json', function() {
      requirejs([
         'angular',
         'src/ngModule',
         'src/core/module',
         'src/services/module',
         'src/components/module'
      ],function(angular, app) {
         angular.bootstrap(document, [app.name]);
      });
   });
});
requirejs([
   'domReady!',
   'src/cmn/core/config/module'
], function(document, Config){
   'use strict';

   Config.init(function() {
      requirejs([
         'angular',
         'src/ngModule',
         'src/cmn/core/loggerfactory/module',
         'src/cmn/core/servicefactory/module',
         'src/cmn/core/componentfactory/module',
         'src/cmn/core/entityregistry/module',
         'src/cmn/core/layoutmanager/module',
         'src/cmn/module',
         'src/app/module'
      ],function(angular, app, LoggerFactory, ServiceFactory, ComponentFactory, EntityRegistry, LayoutManager) {
         if (Config.getConfig('Core.Expose')) {
            window.core = {
               LoggerFactory : LoggerFactory,
               ServiceFactory : ServiceFactory,
               ComponentFactory : ComponentFactory,
               EntityRegistry : EntityRegistry,
               LayoutManager : LayoutManager
            };
         }

         angular.bootstrap(document, [app.name]);
      });
   });
});
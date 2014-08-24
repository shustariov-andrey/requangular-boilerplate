define([
   'module',
   'src/cmn/core/servicefactoryaugmentermanager/module',
   'src/cmn/core/config/module',
   'src/cmn/core/entityregistry/module',
   'src/cmn/core/loggerfactory/module'
], function(module, ServiceFactoryAugmenterManager, Config, EntityRegistry, LoggerFactory) {
   'use strict';

   ServiceFactoryAugmenterManager.register(module.id, function($delegate) {
      $delegate.logger = LoggerFactory.getInstance($delegate.canonicalModuleId);
      $delegate.Config = Config;
      $delegate.EntityRegistry = EntityRegistry;
      return $delegate;
   });
});
define([
   'module',
   'src/cmn/core/loggerfactory/module',
   'src/cmn/core/config/module',
   'src/cmn/core/entityregistry/module',
   'src/ngModule',
   'lodash'
], function(module, LoggerFactory, Config, EntityRegistry, ngModule, _) {
   'use strict';

   var serviceFactoryLogger = LoggerFactory.getInstance(module.id);

   return {
      register : function(moduleName, serviceArray) {
         if (!(serviceArray instanceof Array)) {
            throw new Error('Service function must be provided in array form');
         }

         var serviceLogger = LoggerFactory.getInstance(moduleName);
         var serviceName = _.last(moduleName.split('\/'));

         var serviceFn = serviceArray.pop();

         ngModule.service((Config.getConfig('NamePrefix') || '') + serviceName, serviceArray.concat(function() {
            this.logger = serviceLogger;
            this.Config = Config;
            this.EntityRegistry = EntityRegistry;
            serviceFn.apply(this, arguments);
         }));
         serviceFactoryLogger.trace('Registered service:', moduleName.replace(/\//g, '.').replace(/^src\./, ''));
      }
   };
});
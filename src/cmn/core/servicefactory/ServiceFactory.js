define([
   'module',
   'src/cmn/core/loggerfactory/module',
   'src/cmn/core/config/module',
   'src/cmn/ngModule',
   'lodash',
   'src/cmn/core/servicefactoryaugmentermanager/module',
], function(module, LoggerFactory, Config, ngModule, _, ServiceFactoryAugmenterManager) {
   'use strict';

   var serviceFactoryLogger = LoggerFactory.getInstance(module.id);
   var registry = [];

   ngModule.run(['$injector', function($injector) {
      _.each(registry, function (serviceName) {
         var service = $injector.get(serviceName);
         if (_.isFunction(service.onInit)) {
            service.onInit.call(service);
         }
      });
   }]);

   return {
      register : function(moduleName, serviceArray) {
         if (!(serviceArray instanceof Array)) {
            throw new Error('Service function must be provided in array form');
         }

         var serviceFn = serviceArray.pop();

         if (!(serviceFn instanceof Function)) {
            throw new Error('Last element of service array should be function');
         }

         var canonicalModuleId = moduleName.replace(/\//g, '.').replace(/^src\./, '');
         var serviceName = (Config.getConfig('NamePrefix') || '') + _.last(canonicalModuleId.split('.'));

         var injectorIndex = serviceArray.indexOf('$injector');
         if (injectorIndex === -1) {
            injectorIndex = serviceArray.length;
            serviceArray.push('$injector');
         }

         ngModule.service(serviceName, serviceArray.concat(function() {
            this.canonicalModuleId = canonicalModuleId;
            this.serviceName = serviceName;
            this.$injector = Array.prototype.slice.call(arguments, injectorIndex, injectorIndex + 1)[0];
            serviceFn.apply(this, arguments);
         }));
         ServiceFactoryAugmenterManager.addAugmented({serviceName : serviceName, canonicalModuleId : canonicalModuleId});

         registry.push(serviceName);

         serviceFactoryLogger.trace('Registered service:', canonicalModuleId);
      },

      getRegistry : function() {
         return registry;
      }
   };
});
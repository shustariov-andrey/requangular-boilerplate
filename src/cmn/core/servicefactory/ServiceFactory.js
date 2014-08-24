define([
   'module',
   'src/cmn/core/loggerfactory/module',
   'src/cmn/core/config/module',
   'src/cmn/ngModule',
   'lodash',
   'src/cmn/core/servicefactoryaugmentermanager/module',
], function(module, LoggerFactory, Config, /**@type angular.module*/ ngModule, _, ServiceFactoryAugmenterManager) {
   'use strict';

   var serviceFactoryLogger = LoggerFactory.getInstance(module.id);

   /**
    * @class ServiceFactory
    */
   var ServiceFactory = {
      /**
       *
       * @param {string} moduleName
       * @param {Array<string|Function>} serviceArray
       * @param {Array<string>} [augmentersList]
       */
      register : function(moduleName, serviceArray, augmentersList) {
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
            this.$injector = Array.prototype.slice.call(arguments, injectorIndex, injectorIndex + 1)[0];
            serviceFn.apply(this, arguments);
         }));
         if (augmentersList && augmentersList instanceof Array) {
            ServiceFactoryAugmenterManager.augmentService(canonicalModuleId, augmentersList);
         }

         serviceFactoryLogger.trace('Registered service:', canonicalModuleId, 'as', serviceName);
      }
   };

   return ServiceFactory;
});
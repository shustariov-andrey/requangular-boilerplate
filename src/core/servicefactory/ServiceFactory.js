define(['module', 'src/core/loggerfactory/LoggerFactory', 'src/ngModule', 'lodash'], function(module, LoggerFactory, ngModule, _) {
   'use strict';

   var logger = LoggerFactory.getInstance(module.id);

   return {
      register : function(moduleName, serviceArray) {
         if (!(serviceArray instanceof Array)) {
            throw new Error('Service function must be provided in array form');
         }
         moduleName = moduleName.replace(/\//g, '.');
         var serviceName = _.last(moduleName.split('.'));
         logger.debug('Creating service [' + moduleName + ']');

         var serviceFn = serviceArray.pop();

         var serviceLogger = LoggerFactory.getInstance(moduleName);

         ngModule.service(serviceName, serviceArray.concat(function() {
            this.logger = serviceLogger;
            serviceFn.apply(this, arguments);
         }));
         logger.debug('Service [' + moduleName + '] created');
      }
   };
});
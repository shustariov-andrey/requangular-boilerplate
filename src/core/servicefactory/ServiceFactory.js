define(['module', 'src/core/loggerfactory/LoggerFactory', 'src/ngModule', 'lodash'], function(module, LoggerFactory, ngModule, _) {
   'use strict';

   return {
      register : function(moduleName, serviceArray) {
         if (!(serviceArray instanceof Array)) {
            throw new Error('Service function must be provided in array form');
         }

         var serviceLogger = LoggerFactory.getInstance(moduleName);
         var serviceName = _.last(moduleName.split('\/'));
         serviceLogger.debug('Creating service [' + moduleName + ']');

         var serviceFn = serviceArray.pop();

         ngModule.service(serviceName, serviceArray.concat(function() {
            this.logger = serviceLogger;
            serviceFn.apply(this, arguments);
         }));
         serviceLogger.debug('Service [' + moduleName + '] created');
      }
   };
});
define([
   'module',
   'angular',
   'src/cmn/ngModule',
   'src/cmn/core/loggerfactory/module',
   'src/cmn/core/config/module',
   'lodash'
], function(module, angular, ngModule, LoggerFactory, Config, _) {
   'use strict';

   var componentFactoryLogger = LoggerFactory.getInstance(module.id);

   /**
    * @class ComponentFactory
    */
   var ComponentFactory = {
      register : function(moduleName, options) {
         var controller = options.controller;
         var template = options.template;
         if (!(controller instanceof Array)) {
            throw new Error('Controller function must be provided in array form');
         }

         var logger = LoggerFactory.getInstance(moduleName);
         var componentName = _.last(moduleName.split('\/'));
         if (componentName !== 'Application') {
            componentName = (Config.getConfig('NamePrefix') || '') + componentName;
         } else {
            componentName = componentName[0].toLowerCase() + componentName.substring(1);
         }

         var controllerFn = controller.pop();

         ngModule.directive(componentName, [function() {
            return {
               priority : options.priority,
               template : template,
               replace : false,//('replace' in options) ? !!options.replace : true,
               transclude : options.transclude,
               restrict : options.restrict || 'E',
               scope : options.scope || false,
               controller : controller.concat(function() {
                  if (_.contains(controller, '$scope')) {
                     var index = _.indexOf(controller, '$scope');

                     arguments[index].logger = logger;
                     arguments[index].Config = Config;
                  }
                  controllerFn.apply(this, arguments);
               }),
               compile : function() {
                  return {
                     pre : function() {
                        logger.trace('Pre compile');
                     },
                     post : function() {
                        logger.trace('Post compile');
                     }
                  };
               }
            };
         }]);

         componentFactoryLogger.trace('Registered component:', moduleName.replace(/\//g, '.').replace(/^src\./, ''));
      }
   };

   return ComponentFactory;
});
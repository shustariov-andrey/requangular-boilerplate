define([
   'module',
   'src/ngModule',
   'src/cmn/core/loggerfactory/module',
   'lodash'
], function(module, ngModule, LoggerFactory, _) {
   'use strict';

   return {
      register : function(moduleName, options) {
         var controller = options.controller;
         var template = options.template;
         if (!(controller instanceof Array)) {
            throw new Error('Controller function must be provided in array form');
         }

         var logger = LoggerFactory.getInstance(moduleName);
         var componentName = _.last(moduleName.split('\/'));

         var controllerFn = controller.pop();

         ngModule.directive(componentName[0].toLowerCase() + componentName.substring(1), [function() {
            return {
               priority : options.priority,
               template : template,
               replace : ('replace' in options) ? !!options.replace : true,
               transclude : options.transclude,
               restrict : options.restrict || 'E',
               scope : options.scope || false,
               controller : controller.concat(function() {
                  this.logger = logger;
                  this._ = _;
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
      }
   };
});
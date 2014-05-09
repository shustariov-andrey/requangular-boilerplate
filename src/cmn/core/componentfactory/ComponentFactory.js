define([
   'module',
   'angular',
   'src/ngModule',
   'src/cmn/core/loggerfactory/module',
   'lodash'
], function(module, angular, ngModule, LoggerFactory, _) {
   'use strict';

   return {
      register : function(moduleName, options) {
         var controller = options.controller;
         var template = options.template;
         if (!(controller instanceof Array)) {
            throw new Error('Controller function must be provided in array form');
         }

         var logger = LoggerFactory.getInstance(moduleName);
         logger.trace('Register start');
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
                  if (_.contains(controller, '$scope')) {
                     var index = _.indexOf(controller, '$scope');

                     arguments[index].logger = logger;
                     arguments[index]._ = _;
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
         logger.trace('Register end');
      }
   };
});
define([
   'module',
   'src/cmn/core/loggerfactory/module',
   'src/cmn/ngModule',
   'lodash'
], function(module, LoggerFactory, ngModule, _) {
   'use strict';

   var logger = LoggerFactory.getInstance(module.id),

   augmenters = [],
   augmentedServices = [],

   trueFunc = function(){return true;};

   ngModule.config(['$provide', function($provide) {
      _.each(augmentedServices, function(augmented) {
         $provide.decorator(augmented.serviceName, function($delegate) {
            _.each(augmenters, function(augmenter) {
               if (!!augmenter.selector) {
                  if (augmenter.selector($delegate)) {
                     logger.trace('Augmenting service:', augmented.canonicalModuleId, 'with', augmenter.moduleName);
                     $delegate = augmenter.augmenter($delegate, augmented);
                  }
               } else {
                  logger.trace('Augmenting service:', augmented.canonicalModuleId, 'with', augmenter.moduleName);
                  $delegate = augmenter.augmenter($delegate);
               }
            });
            return $delegate;
         });
      });
   }]);

   return {
      register: function (moduleName, augmenter, selector) {
         if (typeof(augmenter) !== 'function') {
            throw new Error('Augmenter should be function');
         }
         var canonicalAugmenterId = moduleName.replace(/\//g, '.').replace(/^src\./, '');
         logger.trace('Registered augmenter:', canonicalAugmenterId);
         augmenters.push({moduleName : canonicalAugmenterId, augmenter : augmenter, selector : selector ? selector : trueFunc});
      },

      addAugmented : function(serviceName) {
         augmentedServices.push(serviceName);
      }
   };
});
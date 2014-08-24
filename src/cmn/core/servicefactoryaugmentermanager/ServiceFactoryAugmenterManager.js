define([
   'module',
   'src/cmn/core/loggerfactory/module',
   'src/cmn/ngModule',
   'lodash',
   'src/cmn/core/config/module'
], function(module, LoggerFactory, ngModule, _, Config) {
   'use strict';

   var logger = LoggerFactory.getInstance(module.id),

      servicesToAugmentersMap = {},
      augmentersMap = {};

   ngModule.run(['$injector', function($injector) {
      _.forIn(servicesToAugmentersMap, function(entry, key) {
         var $delegate = $injector.get((Config.getConfig('NamePrefix') || '') + _.last(key.split('.')));
         _.each(entry, function(augmenterId) {
            logger.trace('Augmenting service:', key, 'with', augmenterId);
            $delegate = augmentersMap[augmenterId]($delegate);
         });
      });
   }]);

   /**
    *
    * @class ServiceFactoryAugmenterManager
    */
   var ServiceFactoryAugmenterManager = {
      /**
       *
       * @param {string} moduleName
       * @param {Function} augmenter
       */
      register: function (moduleName, augmenter) {
         if (typeof(augmenter) !== 'function') {
            throw new Error('Augmenter should be function');
         }
         var canonicalAugmenterId = moduleName.replace(/\//g, '.').replace(/^src\./, '');
         logger.trace('Registered augmenter:', canonicalAugmenterId);
         augmentersMap[canonicalAugmenterId] = augmenter;
      },

      clean : function() {
         servicesToAugmentersMap = {};
         augmentersMap = {};
      },

      /**
       *
       * @param {string} canonicalModuleId
       * @param {Array<string>} augmentersList
       */
      augmentService : function(canonicalModuleId, augmentersList) {
         servicesToAugmentersMap[canonicalModuleId] = augmentersList;
      }
   };

   return ServiceFactoryAugmenterManager;
});
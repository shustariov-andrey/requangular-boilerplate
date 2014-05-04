define([
   'module',
   'src/cmn/core/componentfactory/module',
   'src/cmn/core/config/module',
   'text!./Application.tpl.html'
], function(module, ComponentFactory, Config, template) {
   'use strict';

   /**
    * This component is common for all applications
    */
   ComponentFactory.register(module.id, {
      template : template,
      controller : ['$scope', '$rootScope', function($scope, $rootScope) {
         var componentName = Config.getConfig('MainComponentName');
         if (!componentName) {
            throw new Error('MainComponentName is not specified in config - nothing to launch');
         }
         var applicationName = Config.getConfig('ApplicationTitle');
         if (!applicationName) {
            this.logger.warn('ApplicationTitle option is not specified. Component name will be used instead');
            applicationName = componentName;
         }

         $scope.getMainComponent = function() {
            return '<' + componentName + '></' + componentName + '>';
         };

         $rootScope.getTitle = function() {
            return applicationName;
         };
      }]
   });
});
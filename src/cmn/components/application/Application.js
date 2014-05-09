define([
   'module',
   'src/cmn/core/componentfactory/module',
   'text!./Application.tpl.html'
], function(module, ComponentFactory, template) {
   'use strict';

   /**
    * This component is common for all applications
    */
   ComponentFactory.register(module.id, {
      template : template,
      controller : ['$scope', '$rootScope', function($scope, $rootScope) {
         var componentName = $scope.Config.getConfig('MainComponentName');
         if (!componentName) {
            throw new Error('MainComponentName is not specified in config - nothing to launch');
         }
         var applicationName = $scope.Config.getConfig('ApplicationTitle');
         if (!applicationName) {
            $scope.logger.warn('ApplicationTitle option is not specified. Component name will be used instead');
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
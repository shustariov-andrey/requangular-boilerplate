define([
   'module',
   '../componentfactory/module',
   'src/core/config/module',
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
         var applicationName = Config.getConfig('ApplicationTitle') || componentName;

         $scope.getMainComponent = function() {
            return '<' + componentName + '/><' + componentName + '/>';
         };

         $rootScope.getTitle = function() {
            return applicationName;
         };
      }]
   });
});
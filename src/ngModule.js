define([
   'src/core/loggerfactory/module',
   'src/core/config/module',
   'angular',
   'angular-route'
], function(LoggerFactory, Config, angular){
   'use strict';

   var ngModule = angular.module('ngModule', ['ngRoute']);

   LoggerFactory.setLogLevel(Config.getConfig('Core.LogLevel') || 'TRACE');

   ngModule.config(['$routeProvider', function($routeProvider){
      $routeProvider.otherwise({redirectTo : '/hello'});
   }]);

   var logger = LoggerFactory.getInstance('$log');
   ngModule.value('$log', logger);

   return ngModule;
});
define([
   'src/core/loggerfactory/LoggerFactory',
   'src/core/loggerfactory/LogLevel',
   'angular',
   'angular-route'
], function(LoggerFactory, LogLevel, angular){
   'use strict';

   var ngModule = angular.module('ngModule', ['ngRoute']);
   LoggerFactory.setLogLevel(LogLevel.TRACE);

   ngModule.config(['$routeProvider', function($routeProvider){
      $routeProvider.otherwise({redirectTo : '/hello'});
   }]);

   var logger = LoggerFactory.getInstance('$log');
   ngModule.value('$log', logger);

   return ngModule;
});
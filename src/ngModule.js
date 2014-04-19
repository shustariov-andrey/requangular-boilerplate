define([
   'src/core/loggerfactory/LoggerFactory',
   'src/core/loggerfactory/LogLevel',
   'angular',
   'angular-route'
], function(LoggerFactory, LogLevel, angular){
   'use strict';

   var module = angular.module('ngModule', ['ngRoute']);
   LoggerFactory.setLogLevel(LogLevel.DEBUG);

   module.config(['$routeProvider', function($routeProvider){
      $routeProvider.otherwise({redirectTo : '/hello'});
   }]);

   return module;
});
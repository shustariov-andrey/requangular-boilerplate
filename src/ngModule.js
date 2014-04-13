define(['LoggerFactory', 'angular', 'angular-route'], function(LoggerFactory, angular){
   'use strict';

   var module = angular.module('ngModule', ['ngRoute']);
   LoggerFactory.init({logLevel : 'INFO', logWriter : window.console.log, logWriterContext : window.console});

   module.config(['$routeProvider', function($routeProvider){
      $routeProvider.otherwise({redirectTo : '/hello'});
   }]);

   return module;
});
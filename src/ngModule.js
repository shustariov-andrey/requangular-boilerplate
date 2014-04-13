define(['LoggerFactory', 'angular', 'angular-route'], function(LoggerFactory, angular){
   'use strict';

   var module = angular.module('ngModule', ['ngRoute']);
   LoggerFactory.init({logLevel : 'INFO'});

   module.config(['$routeProvider', function($routeProvider){
      $routeProvider.otherwise({redirectTo : '/hello'});
   }]);

   return module;
});
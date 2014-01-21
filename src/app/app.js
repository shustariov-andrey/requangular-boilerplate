define(['angular', 'angular-route'], function(angular) {
	'use strict';
	
	var module = angular.module('ngModule', ['ngRoute']);
   
	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo : '/hello'});
	}]);
	
	return module;
});
define(['../app/app'], function(ngModule) {
	'use strict';
	
	return ngModule.controller('HelloCtrl', ['$scope', function($scope) {
		$scope.message = 'Hello, World';
	}]);
});
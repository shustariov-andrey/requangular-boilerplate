define(['angular', 'text!../views/home.html', 'angular-route'], function(angular, template){
    var app = angular.module('myApp', ['ngRoute']);

    app.config(function($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {
                controller: 'HomeCtrl',
                template: template
            });
    });

    return app;
});
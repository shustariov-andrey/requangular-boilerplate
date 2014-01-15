define(['angular', 'text!../views/home.html'], function(angular, template){
    var app = angular.module('myApp', []);

    app.config(function($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {
                controller: 'HomeCtrl',
                template: template
            });
    });

    return app;
});
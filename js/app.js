define(['angular'], function(angular){
    var app = angular.module('myApp', []);

    app.config(function($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {
                controller: 'HomeCtrl',
                templateUrl: 'views/home.html'
            });
    });

    return app;
});
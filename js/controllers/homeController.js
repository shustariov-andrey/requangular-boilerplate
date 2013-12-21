define(["../app"], function(app) {
app.controller("HomeCtrl",
    function($scope) {
            $scope.message = "Hello World!";
        }
    );
    return app;
});


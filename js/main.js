require.config({
    baseUrl: "js",
    paths: {
        "angular": "libs/angular"
    },
    shim: {
        "angular": {
            exports: "angular"
        }
    }
});

require(['angular', './controllers/homeController'], function(angular, app) {
	angular.element(document).ready(function() {
		var html = document.getElementsByTagName('html')[0];
		angular.bootstrap(html, [app.name]);
	});
});


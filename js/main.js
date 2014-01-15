require.config({
    baseUrl: "js",
    paths: {
        "angular": "libs/angular",
        "angular-route": "libs/angular-route"
    },
    shim: {
        "angular": {
            exports: "angular"
        },
        "angular-route" : {
			exports: "angular",
			deps : ["angular"]
        }
    },
    map : {
		'*' : {
			domReady : 'libs/domReady',
			text 	 : 'libs/text'
		}
    }
});

require(['domReady!', 'angular', './controllers/homeController'], function(document, angular, app) {
	var html = document.getElementsByTagName('html')[0];
	angular.bootstrap(html, [app.name]);
});


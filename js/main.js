require.config({
    baseUrl: "js",
    paths: {
        "angular": "libs/angular"
    },
    shim: {
        "angular": {
            exports: "angular"
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


require(['domReady!', 'angular', './controllers/homeController'], function(document, angular, app) {
	var html = document.getElementsByTagName('html')[0];
	angular.bootstrap(html, [app.name]);
});


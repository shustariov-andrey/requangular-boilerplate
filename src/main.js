requirejs.config({
	baseUrl : '.',
	paths : {
		'angular'       : 'bower_components/angular/angular',
		'angular-route' : 'bower_components/angular-route/angular-route',
		
		'domReady' : 'bower_components/requirejs-domready/domReady',
		'text'     : 'bower_components/requirejs-text/text',
		'css'      : 'bower_components/require-css/css',
		'less'     : 'bower_components/require-less/less'
	},
	shim  : {
		'angular' : {
			exports : 'angular'
		},
		'angular-route' : {
			exports : 'angular',
			deps : ['angular']
		}
	},
	map : {
		'*' : {
			'less-builder' : 'bower_components/require-less/less-builder',
			'normalize'    : 'bower_components/require-less/normalize',
			'lessc'        : 'bower_components/require-less/lessc'
		}
	}
});

requirejs(['domReady!', 'angular', 'src/app/app', 'src/hello/module'], function(document, angular, app) {
	'use strict';
	
	angular.bootstrap(document, [app.name]);
});
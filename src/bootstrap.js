requirejs(['domReady!', 'angular', 'src/app/app', 'src/hello/module'], function(document, angular, app){
   'use strict';
   angular.bootstrap(document, [app.name]);
});
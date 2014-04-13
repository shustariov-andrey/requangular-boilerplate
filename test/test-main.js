(function() {
   'use strict';

   var allTestFiles = [];
   var TEST_REGEXP = /spec\.js$/;

   var pathToModule = function(path) {
      return path.replace(/^\/base\//, '').replace(/\.js$/, '');
   };

   Object.keys(window.__karma__.files).forEach(function(file) {
      if (TEST_REGEXP.test(file)) {
         // Normalize paths to RequireJS module names.
         allTestFiles.push(pathToModule(file));
      }
   });

   require.config({

      baseUrl : '/base',
      paths : {
         angular         : 'bower_components/angular/angular',
         'angular-mocks' : 'bower_components/angular-mocks/angular-mocks',
         'angular-route' : 'bower_components/angular-route/angular-route',
         domReady        : 'bower_components/requirejs-domready/domReady',
         text            : 'bower_components/requirejs-text/text',
         css             : 'bower_components/require-css/css',
         less            : 'bower_components/require-less/less'
      },
      shim : {
         angular : {
            exports : 'angular'
         },
         'angular-route' : {
            exports : 'angular',
            deps    : ['angular']
         },
         'angular-mocks' : {
            exports : 'angular',
            deps : ['angular']
         }
      },
      map : {
         '*' : {
            'less-builder' : 'bower_components/require-less/less-builder',
            normalize      : 'bower_components/require-less/normalize',
            lessc          : 'bower_components/require-less/lessc'
         }
      },

      // dynamically load all test files
      deps : allTestFiles,

      // we have to kickoff jasmine, as it is asynchronous
      callback : window.__karma__.start
   });
}());
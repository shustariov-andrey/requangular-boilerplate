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
         'angular-mocks' : 'bower_components/angular-mocks/angular-mocks'
      },
      shim : {
         'angular-mocks' : {
            exports : 'angular',
            deps : ['angular']
         }
      },

      // dynamically load all test files
      deps : allTestFiles,

      // we have to kickoff jasmine, as it is asynchronous
      callback : window.__karma__.start
   });
}());
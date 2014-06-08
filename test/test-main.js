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

   var currConfig = require.s.contexts._.config;
   currConfig.context = 'squire';

   // Duplicating configuration for Squire
   require.config(currConfig);

   var config = {
      context : 'squire',
      baseUrl : '/base',
      paths : {
         'angular-mocks' : 'bower_components/angular-mocks/angular-mocks',
         Squire : 'bower_components/squire/src/Squire'
      },
      shim : {
         'angular-mocks' : {
            exports : 'angular',
            deps : ['angular']
         }
      }
   };

   // Duplicating configuration for Squire
   require.config(config);

   config.context = '_';
   config.deps = allTestFiles;
   config.callback = window.__karma__.start;

   require.config(config);
}());
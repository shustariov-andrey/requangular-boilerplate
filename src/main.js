requirejs.config({
   baseUrl : '../',
   paths : {
      angular             : 'bower_components/angular/angular',
      lodash              : 'bower_components/lodash/dist/lodash',
      'angular-ui-router' : 'bower_components/angular-ui-router/release/angular-ui-router',
      domReady            : 'bower_components/requirejs-domready/domReady',
      text                : 'bower_components/requirejs-text/text',
      css                 : 'bower_components/require-css/css',
      less                : 'bower_components/require-less/less',
      json                : 'bower_components/requirejs-plugins/src/json'
   },
   shim : {
      angular : {
         exports : 'angular'
      },
      'angular-ui-router' : {
         exports : 'angular',
         deps    : ['angular']
      },
      lodash : {
         exports : '_'
      }
   },
   map : {
      '*' : {
         'less-builder'      : 'bower_components/require-less/less-builder',
         normalize           : 'bower_components/require-less/normalize',
         lessc               : 'bower_components/require-less/lessc'
      }
   },
   less : {
      logLevel : 1
   }
});

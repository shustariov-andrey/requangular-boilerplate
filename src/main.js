requirejs.config({
   baseUrl : '../',
   paths : {
      angular         : 'bower_components/angular/angular',
      'angular-route' : 'bower_components/angular-route/angular-route',
      lodash          : 'bower_components/lodash/dist/lodash',

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
      lodash : {
         exports : '_'
      }
   },
   map : {
      '*' : {
         'less-builder' : 'bower_components/require-less/less-builder',
         normalize      : 'bower_components/require-less/normalize',
         lessc          : 'bower_components/require-less/lessc',

         LoggerFactory  : 'src/core/loggerfactory/module',
         ServiceFactory : 'src/core/servicefactory/module'
      }
   },
   less : {
      logLevel : 1
   }
});

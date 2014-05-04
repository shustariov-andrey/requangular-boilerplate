requirejs.config({
   paths : {
      'ui-utils' : 'bower_components/angular-ui-utils/ui-utils'
   },
   shim : {
      'ui-utils' : {
         exports : 'angular',
         deps : ['angular']
      }
   }
});
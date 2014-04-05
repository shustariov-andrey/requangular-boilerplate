define([
   './hello.js',
   'text!./hello.tpl.html',
   'less!./hello.less'
], function(hello, template){
   'use strict';

   return hello.config(['$routeProvider', function($routeProvider){
      $routeProvider.when('/hello', {
         template   : template,
         controller : 'HelloCtrl'
      });
   }]);
});
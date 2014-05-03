define([
   'src/cmn/core/loggerfactory/module',
   'src/cmn/core/config/module',
   'angular',
   'angular-ui-router'
], function(LoggerFactory, Config, angular){
   'use strict';

   var ngModule = angular.module('ngModule', ['ui.router']);
   var logger = LoggerFactory.getInstance('$log');
   ngModule.value('$log', logger);

   return ngModule;
});
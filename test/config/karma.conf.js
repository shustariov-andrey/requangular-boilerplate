// Karma configuration
// Generated on Sat Apr 12 2014 16:26:23 GMT+0300 (Финляндия (лето))

/*jshint node : true*/
module.exports = function(config) {
   'use strict';
   config.set({

      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: '../../',


      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine', 'requirejs'],


      // list of files / patterns to load in the browser
      files: [
         {pattern: 'bower_components/**/*.js', included: false},
         {pattern: 'vendor/**/*.js', included: false},
         {pattern: 'src/**/*.js', included: false},
         {pattern: 'test/test-main.js', included: true},
         {pattern: 'test/**/*.js', included: false},
         
      ],


      // list of files to exclude
      exclude: [
         'src/main.js'
      ],


      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
       
      },


      // test results reporter to use
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['progress'],


      // web server port
      port: 9876,


      // enable / disable colors in the output (reporters and logs)
      colors: true,


      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_INFO,


      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,


      // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: ['Chrome'],


      // Continuous Integration mode
      // if true, Karma captures browsers, runs the tests and exits
      singleRun: true
   });
};

/* global module:false */
module.exports = function(grunt) {
   'use strict';
   var pkg = grunt.file.readJSON('package.json');
   // Project configuration.
   var config = {
      // Metadata.
      pkg : pkg,
      banner : '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
      
      // Task configuration.
      jshint : {
         jshintrc : '.jshintrc',
         gruntfile : {
            src : [
               'src/**/*.js', 'Gruntfile.js'
            ]
         }
      },
      clean : [
         "./out"
      ],
      requirejs : {
         compile : {
            options : {
               waitSeconds : 0,
               baseUrl : ".",
               name : 'src/bootstrap',
               mainConfigFile : "src/main.js",
               out : "./out/main-built.js",
               optimize : "uglify2",
//               optimize : "none",
               inlineText : true,
               findNestedDependencies : true,
               paths : {
                  requireLib : "bower_components/requirejs/require",
               },
               include : [
                  "requireLib"
               ],
               exclude : [
                  'bower_components/require-css/normalize',
                  'bower_components/require-less/normalize'
               ]
            }
         }
      },
      preprocess : {
         web : {
            files : {
               'out/index.html'  : 'index.html'
            }
         }
      }
   };

   grunt.initConfig(config);

   // These plugins provide necessary tasks.
   grunt.loadNpmTasks('grunt-contrib-requirejs');
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-preprocess');

   grunt.registerTask('compile', [
      'jshint', 'clean', 'requirejs:compile', 'preprocess:web'
   ]);

   // Default task.
   grunt.registerTask('default', [
      'compile'
   ]);

};

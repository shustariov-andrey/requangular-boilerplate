/* global module:false */
module.exports = function(grunt){
   'use strict';
   var pkg = grunt.file.readJSON('package.json');
   var sources = ['src/**/*.js', 'Gruntfile.js'];
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
         options : {
            jshintrc : '.jshintrc'
         },
         all : sources
      },
      jscs : {
         options : {
            config : '.jscsrc'
         },
         src : sources
      },
      clean : [
         './out'
      ],
      requirejs : {
         compile : {
            options : {
               waitSeconds : 0,
               baseUrl : '.',
               name : 'src/main',
               mainConfigFile : 'src/main.js',
               out : './out/main-built.js',
               optimize : 'uglify2',
               generateSourceMaps : true,
               preserveLicenseComments : false,
//               optimize : 'none',
               inlineText : true,
               findNestedDependencies : true,
               paths : {
                  requireLib : 'bower_components/requirejs/require'
               },
               include : [
                  'requireLib'
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
      },
      watch : {
         scripts : {
            files : ['src/**', './Gruntfile.js'],
            tasks : ['verify'],
            options : {
               spawn : true,
               interrupt : true,
               atBegin : true
            }
         }
      },
      bower : {
         install : {
            options : {
               copy : false
            }
         }
      },
      karma: {
         unit: {
            configFile: 'config/karma.conf.js'
         }
      }
   };

   grunt.initConfig(config);

   // These plugins provide necessary tasks.
   grunt.loadNpmTasks('grunt-contrib-requirejs');
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-jscs-checker');
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-preprocess');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-bower-task');
   grunt.loadNpmTasks('grunt-karma');

   grunt.registerTask('verify', ['jshint']);
   grunt.registerTask('test', ['karma:unit']);
   grunt.registerTask('build', [
      'bower:install', 'verify', 'test', 'clean', 'requirejs:compile', 'preprocess:web'
   ]);

   // Default task.
   grunt.registerTask('default', [
      'watch'
   ]);

};

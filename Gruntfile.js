'use strict';

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // load all grunt-related tasks together instead of one-by-one
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist',
    srcScript: '<%= config.app %>/scripts'
  };

  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= config.srcScript %>/{,*/}*.js'],
        tasks: 'babel'
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: []
      }
    },

    // Compiles ES6 with Babel
    babel: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.srcScript %>',
          src: '{,*/}*.js',
          dest: '<%= config.dist %>/scripts',
          ext: '.js'
        }]
      }
    },

    // Empties folders to start fresh
    clean: {
      release: ['package']
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= config.app %>',
            dest: '<%= config.dist %>',
            src: [
              'images/{,*/}*',
              'libs/{,*/}*',
              'libs/{,*/}*/{,*/}*',
              'scripts/{,*/}*.js',
              '{,*/}*.html',
              'styles/{,*/}*.css',
              'manifest.json'
            ]
          }
        ]
      }
    },

    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/scripts',
          src: ['*.js', '!*.min.js'],
          dest: '<%= config.dist %>/scripts/'
        }]
      }
    },

    // Auto buildnumber, exclude debug files. smart builds that event pages
    chromeManifest: {
      dist: {
        options: {
          buildnumber: true,
          indentSize: 2,
          background: {}
        },
        src: '<%= config.app %>',
        dest: '<%= config.dist %>'
      }
    },

    // Compress dist files to package
    compress: {
      dist: {
        options: {
          archive: function() {
            var manifest = grunt.file.readJSON('app/manifest.json');
            return 'package/nocomment-' + manifest.version + '.zip';
          }
        },
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['**/*'],
          dest: ''
        }]
      }
    }
  });

  grunt.registerTask('build', [
    'copy:dist',
    'babel',
    'uglify'
  ]);

  grunt.registerTask('release', [
    'clean:release',
    'chromeManifest:dist',
    'compress'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};

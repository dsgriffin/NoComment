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

    // Empties folders to start fresh
    clean: {
      release: ['package']
    },

    // Auto buildnumber, exclude debug files. smart builds that event pages
    chromeManifest: {
      app: {
        options: {
          buildnumber: true,
          indentSize: 2,
          background: {}
        },
        src: '<%= config.app %>',
        dest: '<%= config.app %>'
      }
    },

    // Compress app files to package
    compress: {
      app: {
        options: {
          archive: function() {
            var manifest = grunt.file.readJSON('app/manifest.json');
            return 'package/nocomment-' + manifest.version + '.zip';
          }
        },
        files: [{
          expand: true,
          cwd: 'app/',
          src: ['**/*'],
          dest: ''
        }]
      }
    }
  });

  grunt.registerTask('release', [
    'clean:release',
    'chromeManifest:app',
    'compress'
  ]);
};

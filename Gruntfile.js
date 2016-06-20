'use strict';

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // load all grunt-related tasks together instead of one-by-one
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    srcScript: '<%= config.app %>/scripts'
  };

  grunt.initConfig({

    // Project settings
    config: config,
    
    // Empties folders to start fresh
    clean: {
      release: ['package']
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
    'compress'
  ]);
};

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: true,
        },
        files: {
          'assets/css/app.css': 'src/scss/app.scss'
        }
      }
    },

    uglify: {
      foundation: {
        files: [{
          expand: true,
          cwd: 'src/js',
          src: '*.js',
          dest: 'assets/js'
        }]
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/img',
          src: ['**/*.{jpg,png,gif}'],
          dest: 'assets/img/'
        }]
      }
    },

    watch: {
      grunt: {
        options: {
          reload: true,
        },
        files: ['Gruntfile.js']
      },

      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass']
      },

      js: {
        files: 'src/js/**/*.js',
        tasks: ['uglify']
      },

      img: {
        files: 'src/img/**/*.{jpg,png,gif}'
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'assets/css/*.css',
            'assets/js/*.js',
            '*.html'
          ]
        },
        options: {
          watchTask: true,
          proxy: '192.168.50.4'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('build', ['sass', 'uglify', 'imagemin']);
  grunt.registerTask('default', ['browserSync', 'watch']);
};

module.exports = function(grunt) {

  // 1. All configuration goes here 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    typescript: {
      base: {
        src: ['_dev/ts/*.ts'],
        dest: '_dev/js/app.js',
        options: {
          module: 'amd',
          target: 'es5'
        }
      }
    },
    uglify: {
      build: {
        src: "_dev/js/app.js",
        dest: "scripts/app.min.js"
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          '_dev/css/app.css': '_dev/sass/app.scss'
        }
      }
    },
    autoprefixer: {
      dist: {
        files: {
          'content/app-prefixed.css': '_dev/css/app.css'
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'assets/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'assets/img/'
        }]
      }
    },
    watch: {
      scripts: {
        files: ['_dev/ts/*.ts'],
        tasks: ['typescript', 'uglify'],
        options: {
          spawn: false,
        }
      },
      css: {
        files: '_dev/sass/app.sass',
        tasks: ['sass', 'autoprefixer']
      }
    } //End watch
  });


  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-typescript');
  
  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask(
    'default', [
      'typescript',
      'uglify',
      'sass',
      'autoprefixer',
      'imagemin',
      'watch'
    ]);

};

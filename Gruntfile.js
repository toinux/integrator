'use strict';

var compass = require('compass-importer');

module.exports = function(grunt) {

	grunt.initConfig({
		sass: {
			app: {
				files: [{
					expand: true,
					cwd: 'sass',
					src: ['*.scss'],
					dest: '<%= swg.dst %>',
					ext: '.css'
				}]
			},
			// Voir https://github.com/sass/node-sass#options pour toutes les operations
			options: {
				sourceMap: false, 
				outputStyle: 'compressed',
				includePaths: [
					'.compass',
					'bower_components/bootstrap-sass/assets/stylesheets'
					],
            	importer: compass
			}
		},
		watch: {
			sass: {
				// Watches all Sass or Scss files within the sass folder and one level down. 
				// If you want to watch all scss files instead, use the "**/*" globbing pattern
				files: ['<%= swg.src %>/*.{scss,sass}'],
				// runs the task `sass` whenever any watched file changes 
				tasks: ['sync', 'sass']

			},
			options: {
				atBegin: true,
				spawn: false,
				interrupt: true,
				// voir ici https://github.com/livereload/livereload-js
				// et ici https://addons.mozilla.org/fr/firefox/addon/livereload/
				// et ici https://github.com/gruntjs/grunt-contrib-watch/blob/master/docs/watch-examples.md#enabling-live-reload-in-your-html
				livereload: 35729,
				livereloadOnError: false,
				dateFormat: function(time) {
					grunt.log.write(grunt.template.today("[hh:MM:ss] "));
					grunt.log.writeln('Execution en '+time+'ms');
				}
			}
		},
		sync: {
			main: {
				files: [{
					cwd: '<%= swg.src %>',
					src: ['*.scss'],
					dest: 'sass'
				}],
				verbose: true, // Default: false 
				pretend: false, // Don't do any disk operations - just write log. Default: false
				updateAndDelete: true
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'css/style.min.css': ['css/style.css']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sync');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default', ['integratorConfig', 'watch']);
	grunt.registerTask('build', ['integratorConfig', 'sass']);

	grunt.registerTask('integratorConfig', 'Vérification de la configuration',  function() {

		var src = grunt.option('src') || grunt.fail.fatal("option --src=<repertoire> manquant");
		var dst = grunt.option('dst') || grunt.fail.fatal("option --dst=<repertoire> manquant");

		grunt.file.isDir(src) || grunt.fail.fatal("repertoire '"+src+"' inexistant");
		grunt.file.isDir(dst) || grunt.fail.warn("repertoire '"+dst+"' inexistant");

		grunt.config('swg.src', src);
		grunt.config('swg.dst', dst);

		grunt.log.write("Répertoire source      : ").writeln(src['cyan']);
		grunt.log.write("Répertoire destination : ").writeln(dst['cyan']);
	});

};

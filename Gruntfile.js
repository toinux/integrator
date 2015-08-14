'use strict';

var compass = require('compass-importer');

module.exports = function(grunt) {

	grunt.initConfig({
		cfg: grunt.file.readJSON('config.json'),
		sass: {
			app: {
				files: [{
					expand: true,
					cwd: '<%= swg.src %>',
					src: ['*.scss'],
					dest: 'css',
					ext: '.css'
				}]
			},
			// Voir https://github.com/sass/node-sass#options pour toutes les operations
			options: {
				sourceMap: true, 
				outputStyle: 'nested',
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
				tasks: ['sass', 'sync']

			},
			options: {
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
					cwd: 'css',
					src: ['*.css', '*.css.map'],
					dest: '<%= swg.dst %>'
				}],
				verbose: true, // Default: false 
				pretend: false // Don't do any disk operations - just write log. Default: false 
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sync');
	grunt.registerTask('default', ['integratorConfig', 'watch']);

	grunt.registerTask('integratorConfig', 'Vérification de la configuration',  function() {

		var dir = grunt.option('dir') || grunt.fail.fatal("option --dir=<repertoire> manquante");

		var source = dir+'/sass';
		grunt.file.isDir(source) || grunt.fail.fatal("repertoire '"+source+"' inexistant");

		var destination = grunt.config.data.cfg.www + '/' + grunt.option('dir') + '/css/'
		grunt.file.isDir(destination) || grunt.fail.fatal("repertoire '"+destination+"' inexistant");

		grunt.config('swg.src', source);
		grunt.config('swg.dst', destination + grunt.config.data.cfg.prefix);

		grunt.log.write("Répertoire sass : ").writeln(source['cyan']);
		grunt.log.write("Répertoire css  : ").writeln(destination['cyan']);
	});

};
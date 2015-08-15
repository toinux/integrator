'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		sass: {
			app: {
				files: [{
					expand: true,
					cwd: '<%= cfg.src %>',
					src: ['*.scss'],
					dest: '<%= cfg.dst %>',
					ext: '.css'
				}]
			},
			// Voir https://github.com/sass/node-sass#options pour toutes les operations
			options: {
				sourceMap: true, 
				outputStyle: 'compressed',
				includePaths: [
					'bower_components/compass-mixins/lib',
					'bower_components/bootstrap-sass/assets/stylesheets'
					]
			}
		},
		watch: {
			sass: {
				// Watches all Sass or Scss files within the sass folder and one level down. 
				// If you want to watch all scss files instead, use the "**/*" globbing pattern
				files: ['*.scss'],
				// runs the task `sass` whenever any watched file changes 
				tasks: ['sass']

			},
			options: {
				cwd: '<%= cfg.src %>',
				spawn: false,
				interrupt: true,
				// voir ici https://github.com/livereload/livereload-js
				// et ici https://addons.mozilla.org/fr/firefox/addon/livereload/
				// et ici https://github.com/gruntjs/grunt-contrib-watch/blob/master/docs/watch-examples.md#enabling-live-reload-in-your-html
				livereload: 35729,
				livereloadOnError: false,
				dateFormat: function(time) {
					grunt.log.write(grunt.template.today("[HH:MM:ss] "));
					grunt.log.writeln('Execution en '+time+'ms');
				}
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1,
				sourceMap: true
			},
			target: {
				files: [{
					expand: true,
					cwd: '<%= cfg.dst %>',
					src: ['*.css', '!*.min.css'],
					dest: '<%= cfg.dst %>'
					// ext: '.min.css' exemple d'extension, autrement les css originaux seront remplacés
				}]
			}
		},
		express: {
			options: {
				args: [] // url de redirection par defaut, par exemple ['http://www.foo.bar']
			},
			main: {
				options: {
					script: 'server.js'
				}
			}
		}
	});

	// lecture du fichier de configuration
	if (grunt.file.exists('config.json')) {
		grunt.config.merge(grunt.file.readJSON('config.json'));
	}

	// --src=... et --dst=... sont prioritaires par rapport au fichier de configuration
	var options = {};
	['src','dst'].forEach(function(arg) {
		if (grunt.option(arg)) {
			options[arg] = grunt.option(arg);
		}
	});

	// mise à jour de la configuration par rapport aux options passées en ligne de commande
	grunt.config.merge({
		cfg: options
	});
	
	var cfg = grunt.config.get('cfg');
	var src = cfg.src || grunt.fail.fatal("option --src=<repertoire> manquant");
	var dst = cfg.dst || grunt.fail.fatal("option --dst=<repertoire> manquant");

	grunt.file.isDir(src) || grunt.fail.fatal("repertoire '"+src+"' inexistant");
	grunt.file.isDir(dst) || grunt.fail.warn("repertoire '"+dst+"' inexistant");

	grunt.log.write("Répertoire source      : ").writeln(src['cyan']);
	grunt.log.write("Répertoire destination : ").writeln(dst['cyan']);
	
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-express-server');

	grunt.registerTask('default', ['sass', 'watch']);
	grunt.registerTask('serve', ['express', 'default']);

};

'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		sass: {
			app: {
				files: [{
					expand: true,
					cwd: 'sass',
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
					'.compass',
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
				tasks: ['sync', 'sass']

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
		sync: {
			main: {
				files: [{
					cwd: '<%= cfg.src %>',
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

	if (grunt.file.exists('config.json')) {
		grunt.config.merge(grunt.file.readJSON('config.json'));
	}

	// --src=... et --dst=... sont prioritaires
	var options = {};
	['src','dst'].forEach(function(arg) {
		if (grunt.option(arg)) {
			options[arg] = grunt.option(arg);
		}
	});
	grunt.config.merge({
		cfg: options
	});
	
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sync');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.registerTask('default', ['integratorConfig', 'sync', 'sass', 'watch']);
	grunt.registerTask('server', ['express', 'default']);
	grunt.registerTask('build', ['integratorConfig', 'sync', 'sass']);

	grunt.registerTask('integratorConfig', 'Vérification de la configuration',  function() {

		var cfg = grunt.config.get('cfg');
		var src = cfg.src || grunt.fail.fatal("option --src=<repertoire> manquant");
		var dst = cfg.dst || grunt.fail.fatal("option --dst=<repertoire> manquant");

		grunt.file.isDir(src) || grunt.fail.fatal("repertoire '"+src+"' inexistant");
		grunt.file.isDir(dst) || grunt.fail.warn("repertoire '"+dst+"' inexistant");

		grunt.log.write("Répertoire source      : ").writeln(src['cyan']);
		grunt.log.write("Répertoire destination : ").writeln(dst['cyan']);
		
	});

};

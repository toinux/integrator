'use strict';
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
				outputStyle: 'nested'	
			}
		},
		watch: {
			sass: {
				// Watches all Sass or Scss files within the sass folder and one level down. 
				// If you want to watch all scss files instead, use the "**/*" globbing pattern
				files: ['sass/{,*/}*.{scss,sass}'],
				// runs the task `sass` whenever any watched file changes 
				tasks: ['sass', 'sync']
			},
			options: {
				spawn: false
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
	grunt.registerTask('default', ['integratorConfig', 'sass', 'sync']);

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
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
	grunt.registerTask('default', ['sass']);
	grunt.registerTask('test', 'task de test',  function() {

		var prefix = grunt.config.data.cfg.prefix;
		var www = grunt.config.data.cfg.www;
		var destination = www+'/'+grunt.option('dir')+'/css/'+prefix;
		grunt.config('swg.src', grunt.option('dir')+'/sass');
		grunt.config('swg.dst', destination);

		grunt.log.write("Répertoire selectionné    : ").writeln(grunt.option('dir'));
		grunt.log.write("Répertoire de destination : ").writeln(destination);
		grunt.task.run('sass');
		grunt.task.run('sync');
	});

};
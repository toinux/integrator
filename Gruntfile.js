'use strict';
module.exports = function(grunt) {

	grunt.initConfig({
		sass: {
			app: {
				files: [{
					expand: true,
					cwd: 'sass',
					src: ['*.scss'],
					dest: 'css',
					ext: '.css'
				}]
			},
			options: {
				sourceMap: true, 
				outputStyle: 'nested', 
				imagePath: "../",
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
				files: [
					{cwd: 'css', src: ['style.css'], dest: '/home/toine/mnt/mutint2/www/swgbrossette2/css/toine'}
				],
				verbose: true, // Default: false 
				pretend: false // Don't do any disk operations - just write log. Default: false 
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sync');
	grunt.registerTask('default', ['sass']);
};
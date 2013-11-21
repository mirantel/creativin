'use strict';
module.exports = function(grunt) {

grunt.initConfig({
	stylus: {
		options: {
			compress: false,
		},
		global: {
			files: {
				'production/css/screen.css': 'src/styl/screen.styl'
			},
		},
	},

	autoprefixer: {
		options: {
			 browsers: ['last 3 version', 'ie >= 8']
		},
		global: {
			src: 'production/css/screen.css'
		},
	},

	copy: {
		img: {
			files: [
				{expand: true, cwd: 'src/img/', src: ['**'], dest: 'production/img/'}
			]
		},
		js: {
			files: [
				{expand: true, cwd: 'src/js/', src: ['**'], dest: 'production/js/'}
			]
		}
	},
	includereplace: {
		dist: {
			options: {
				prefix: '@@',
				suffix: ''
			},
			src: 'src/*.html',
			dest: 'production/'
		}
	},

	clean: {
		html: ["production/_*.html"],
		release: ["production"],
	},

	csso: {
		dist: {
			src: 'production/css/screen.css',
			dest:'production/css/screen.min.css'
		}
	},

	watch: {
		css: {
			files: 'src/styl/*.styl',
			tasks: ['stylus', 'autoprefixer'],
		},
		js: {
			files: 'src/js/*.js',
			tasks: ['copy:js'],
		},
		html: {
			files: 'src/*html',
			tasks: ['includereplace', 'clean:html'],
		},
		img: {
			files: 'src/img/**',
			tasks: ['copy:img'],
		}
	},

});
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-csso');

	grunt.registerTask( 'default', ['watch']);
	grunt.registerTask( 'release', ['clean:release', 'stylus', 'copy', 'includereplace', 'csso', 'clean:html']);

};
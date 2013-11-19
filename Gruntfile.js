'use strict';
module.exports = function(grunt) {

grunt.initConfig({
	stylus: {
		compile: {
			options: {
				paths: ['path/to/import', 'another/to/import'],
				urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
				use: [
					require('fluidity') // use stylus plugin at compile time
					],
				import: [      //  @import 'foo', 'bar/moo', etc. into every .styl file
					'foo',       //  that is compiled. These might be findable based on values you gave
					'bar/moo'    //  to `paths`, or a plugin you added under `use`
					]
			},
			files: {
				'path/to/result.css': 'path/to/source.styl', // 1:1 compile
				'path/to/another.css': ['path/to/sources/*.styl', 'path/to/more/*.styl'] // compile and concat into single file
			}
		}
	},
	copy: {
		main: {
			files: [
				{expand: true, cwd: 'src/img/', src: ['**'], dest: 'production/img/'},
				{expand: true, cwd: 'src/css/', src: ['screen.css'], dest: 'production/css/'},
				{expand: true, cwd: 'src/js/', src: ['**'], dest: 'production/js/'}
			]
		},
		css: {
			files: [
				{expand: true, cwd: 'src/img/', src: ['**'], dest: 'production/img/'},
				{expand: true, cwd: 'src/css/', src: ['**'], dest: 'production/css/'},
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
	csso: {
		dist: {
			src: 'src/css/screen.css',
			dest:'production/css/screen.min.css'
		}
	},
	watch: {
		css: {
			files: 'src/styl/*.styl',
			tasks: ['stylus','copy:css','clean:css'],
		},
		js: {
			files: 'src/js/*.js',
			tasks: ['copy:js'],
		},
		html: {
			files: 'src/*html',
			tasks: ['includereplace', 'clean:html'],
		},
	},
	clean: {
		html: ["production/_*.html"],
		css: ["src/css"],
		dev: ["production/_*.html", "src/css"],
		release: ["production"],
		after: ["production/_*.html", "src/css"]
	}
});
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-csso');

	grunt.registerTask( 'default', ['watch']);
	grunt.registerTask( 'release', ['clean:release', 'compass', 'copy:main', 'includereplace', 'csso', 'clean:after']);

};
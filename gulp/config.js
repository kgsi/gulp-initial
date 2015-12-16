var path               = require('path'),
	src	               = './src',
	dest               = './dist',
	relativeSrcPath    = path.relative('.', src);

module.exports = {
	src: src,
	dest: dest,

	ejs: {
		src:   [src + '/**/*.ejs', '!' + src + '/**/_*.ejs'],
		watch: src + '/**/*.ejs',
		json:  src + '/data.json',
		dest:  dest
	},

	css: {
		src: src + '/assets/sass/**/*.scss',
		dest: dest + '/assets/css',
		sass: src + '/assets/sass',
		images: src + '/assets/images',
		uglify: true
	},

	js: {
		src: src + '/assets/js/*.js',
		dest: dest + '/assets/js',
		uglify: true
	},

	libs: {
		src: [
			src + '/assets/js/vendor/jquery.js',
			src + '/assets/js/vendor/velocity.js'
			// src + '/js/vendor/velocity.ui.js'
		],
		rename: 'libs.js',
		watch:  src + '/assets/js/vendor/*.js',
		dest:   dest + '/assets/js'
	},

	image: {
		src:  dest + '/assets/images/**/*',
		dest: dest + '/assets/images'
	},

	// copy: {
	// 	src: [
	// 		src + '/**/*',
	// 		'!' + src + '/**/*.ejs',
	// 		'!' + src + '/assets/partial',
	// 		'!' + src + '/data.json',
	// 		'!' + src + '/assets/js/*.js'
	// 	],
	// 	watch: [
	// 		src + '/**/*',
	// 	],
	// 	base: src,
	// 	dest: dest
	// }
};

var path               = require('path'),
	app               = 'app',
    dist               = 'dist';
	//relativeSrcPath    = path.relative('.', src);

module.exports = {

	css: {
		src:    app + '/assets/sass/**/*.scss',
		dest:   app + '/assets/css',
		sass:   app + '/assets/sass',
		images: app + '/assets/images',
		uglify: true
	},

	js: {
    	src:    app + '/assets/js/*.js',
		dest:   app + '/assets/js',
		uglify: false
	},

    libs: {
		src:    '*',
		dest:   app + '/assets/js/vendor/',
        rename: 'libs.js',
		uglify: false
	},

	image: {
		src:  dist + '/assets/images/**/*',
		dest: dist + '/assets/images'
	}
};

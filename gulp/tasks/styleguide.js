var gulp       = require('gulp'),
	styleguide = require('gulp-styledocco'),
	config     = require('../config');

// styleGuide
gulp.task('styleguide', function () {
	gulp.src(config.dest + '/assets/css/*.css')
		.pipe(styleguide({
			out: '/styleguide',
			name: 'styleguide'
	}));
});
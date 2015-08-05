var gulp    = require('gulp'),
	uglify  = require('gulp-uglify'),
	concat  = require('gulp-concat'),
	config  = require('../config').libs;

// library min (concat & uglify)
gulp.task('libs', function() {
	return gulp.src(config.src)
		.pipe(concat(config.rename))
		.pipe(uglify())
		.pipe(gulp.dest(config.dest));
});
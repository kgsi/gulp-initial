var gulp    = require('gulp'),
	browser = require('browser-sync'),
	plumber = require('gulp-plumber'),
	babel   = require('gulp-babel'),
	config  = require('../config').js;

gulp.task('babel', function() {
	return gulp.src(config.src)
		.pipe(babel())
		.pipe(gulp.dest(config.dest))
		.pipe(browser.reload({
			stream: true,
			once: true
		}));
});
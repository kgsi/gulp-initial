var gulp       = require('gulp'),
	browser    = require('browser-sync'),
	plumber    = require('gulp-plumber'),
	babel      = require('gulp-babel'),
	sourcemaps = require('gulp-sourcemaps'),
	config     = require('../config').js;

gulp.task('babel', function() {
	return gulp.src(config.src)
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(sourcemaps.write('./',{includeContent: false, sourceRoot: config.src}))
		.pipe(gulp.dest(config.dest))
});

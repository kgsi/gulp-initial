var gulp       = require('gulp'),
	browser    = require('browser-sync'),
	plumber    = require('gulp-plumber'),
	notify     = require('gulp-notify'),
	sass       = require('gulp-sass'),
	pleeease   = require('gulp-pleeease'),
	sourcemaps = require('gulp-sourcemaps'),
	config     = require('../config').css;

gulp.task('sass', function () {
	 gulp.src(config.src)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(sourcemaps.init())
		.pipe(sass({sourcemap: true}))
		.pipe(pleeease({
			autoprefixer: ['last 4 versions'],
			sourcemaps: true,
			minifier: config.uglify,
			sass: true
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.dest))
		.pipe(browser.reload({
			stream: true
		}));
});
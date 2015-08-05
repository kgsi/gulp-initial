var gulp     = require('gulp'),
	browser  = require('browser-sync'),
	plumber  = require('gulp-plumber'),
	notify   = require('gulp-notify'),
	compass  = require('gulp-compass'),
	pleeease = require('gulp-pleeease'),
	config   = require('../config').css;


// sass(compass)
gulp.task('compass', function () {
	return gulp.src(config.src)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(compass({ 
			css: config.dest,
			sass: config.sass,
			image: config.images,
			sourcemap: true
		}))
		.pipe(pleeease({
			fallbacks: {
				autoprefixer: ['last 4 versions'] 
			},
			minifier: config.uglify
		}))
		.pipe(gulp.dest(config.dest))
		.pipe(browser.reload({
			stream: true
		}));
});
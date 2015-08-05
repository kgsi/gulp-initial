var gulp    = require('gulp'),
	path    = require('path'),
	browser = require('browser-sync'),
	gutil   = require("gulp-util"),
	gulpif  = require('gulp-if'),
	uglify  = require('gulp-uglify'),
	webpack = require('gulp-webpack'),
	config  = require('../config');


gulp.task('webpack', function () {
	// return gulp.src('/js/libs/jquery.js')
	return gulp.src(config.webpack.entry)
		.pipe(webpack(config.webpack))
		.pipe(gulp.dest(config.js.dest))
		.on('end', function(){
			 return gulp.src(config.js.dest)
				.pipe(gulpif(config.js.uglify, uglify()))
				.pipe(browser.reload({
					stream: true,
					once: true
				}));
		});
});
var gulp           = require('gulp'),
    path           = require('path'),
	mainBowerFiles = require('main-bower-files'),
    filter         = require('gulp-filter'),
	concat         = require('gulp-concat'),
	config         = require('../config').libs;


gulp.task('libs', function() {
    var filterJS = filter(config.src);
	return gulp.src(mainBowerFiles())
        .pipe(filterJS)
		.pipe(concat(config.rename))
		.pipe(gulp.dest(config.dest));
});

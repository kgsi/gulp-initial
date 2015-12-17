var gulp          = require('gulp'),
	gutil         = require('gulp-util'),
	minimist      = require('minimist'),
	runSequence   = require('run-sequence'),
	config        = require('../config');

gulp.task('dist',function(callback){
	runSequence('clean', 'sass', 'copy', 'image', 'libs');
});

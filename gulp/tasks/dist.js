var gulp          = require('gulp'),
	gutil         = require('gulp-util'),
	minimist      = require('minimist'),
	runSequence   = require('run-sequence'),
	config        = require('../config');

gulp.task('dest',function(callback){
	runSequence('clean', ['sass','ejs'], 'copy', ['image', 'libs']);
});
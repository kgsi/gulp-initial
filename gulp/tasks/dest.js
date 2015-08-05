var gulp          = require('gulp'),
	gutil         = require('gulp-util'),
	minimist      = require('minimist'),
	runSequence   = require('run-sequence'),
	config        = require('../config'),
	gulpif        = require('gulp-if');


// dest
gulp.task('dest',function(callback){
	// CLI解析（--upload） 
	var cliOption = minimist(process.argv.slice(3));
	var isUpload = (cliOption.upload) ? true : false;

	if(!isUpload){
		// --upload 無し
		runSequence('clean', ['compass','ejs'], 'copy', ['image', 'libs']);
	}else{
		// --upload 有り
		runSequence('clean', ['compass','ejs'], 'copy', ['image', 'libs'], 'upload');
	}
});
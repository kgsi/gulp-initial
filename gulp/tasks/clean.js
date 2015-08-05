var gulp          = require('gulp'),
	del           = require('del'),
	config        = require('../config');


// clean
gulp.task('clean', function(callback) {
	del([config.dest], callback);
});

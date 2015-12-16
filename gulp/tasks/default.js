var gulp   = require('gulp'),
	path   = require('path'),
	watch  = require('gulp-watch'),
	config = require('../config');

// default
gulp.task('default', ['browser','watch'], function() {
	gulp.start(['sass', 'ejs', 'libs', 'babel']);
})

// watch
gulp.task('watch', function(){

	watch([config.css.src], function(event){
		gulp.start(['sass']);
	});

	watch([config.js.src], function(event){
		gulp.start(['babel']);
	});

	watch([config.ejs.watch], function(event){
		gulp.start(['ejs']);
	});

	watch([config.libs.watch], function(event){
		gulp.start(['libs']);
	});

});

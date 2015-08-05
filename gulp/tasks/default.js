var gulp   = require('gulp'),
	path   = require('path'),
	watch  = require('gulp-watch'),
	config = require('../config');


// default
gulp.task('default', ['browser','watch'], function() {
	gulp.start(['compass','ejs','copy','libs']);
	//gulp.start(['compass','ejs','webpack','copy','libs']);
})

// watch
gulp.task('watch', function(){
	watch([config.css.src], function(event){
		gulp.start(['compass']);
	});

	watch([config.ejs.watch], function(event){
		gulp.start(['ejs']);
	});

	watch(config.copy.watch, function(event){
		gulp.start(['copy'])
	});

	watch([config.libs.watch], function(event){
		gulp.start(['libs']);
	});

	// watch([config.js.src], function(event){
	// 	gulp.start(['webpack'])
	// });

});
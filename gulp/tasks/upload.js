var gulp   = require('gulp'),
	ftp    = require('gulp-ftp'),
	config = require('../config');


// ftp upload
gulp.task('upload',function(callback){
	return gulp.src(config.dest)
		.pipe(ftp({
			host: 'XXX',
			user: 'XXX',
			pass: '000',
			remotePath: '/XXX/XXX/',
		}))
		.pipe(gutil.noop()).on('end', function() {
			console.log('アップロード完了');
		});
});

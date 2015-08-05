var gulp    = require('gulp'),
	browser = require('browser-sync'),
	plumber = require('gulp-plumber'),
	notify  = require('gulp-notify'),
	changed = require('gulp-changed'),
	config  = require('../config').copy;

// copy
gulp.task('copy', function(){
	gulp.src(
		config.src,
		{ base: config.base } // 開発ディレクトリの構造を維持したままコピー
		)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(changed(config.dest))
		.pipe(gulp.dest(config.dest))
		.pipe(browser.reload({
			stream: true
		}));
})
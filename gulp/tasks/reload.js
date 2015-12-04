var gulp    = require('gulp'),
	browser = require('browser-sync'),
	plumber = require('gulp-plumber'),
	notify  = require('gulp-notify'),
	changed = require('gulp-changed'),
	config  = require('../config').copy;

// reload
gulp.task('reload', function(){
	gulp.src(
		config.src,
		{ base: config.base } // 開発ディレクトリの構造を維持したままコピー
		)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(changed(config.dest))
		.pipe(browser.reload({
			stream: true
		}));
})
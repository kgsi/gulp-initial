var gulp    = require('gulp'),
	browser = require('browser-sync'),
	config  = require('../config');

gulp.task('browser', function() {
	browser({
		// phpを使わない場合は下記を有効にする
		// server: {
		// 	baseDir: config.dest
		// },
		reloadDelay: 500,
		// phpを使う場合は、下記を有効にして、appディレクトリを
		// MAMPを使うなどしてサーバ化する
		proxy: 'localhost:8888'
	});
});

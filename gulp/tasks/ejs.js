var fs      = require('fs'),
	gulp    = require('gulp'),
	browser = require('browser-sync'),
	plumber = require('gulp-plumber'),
	notify  = require('gulp-notify'),
	ejs     = require("gulp-ejs"),
	config  = require('../config').ejs;

gulp.task('ejs', function() {
	var json = JSON.parse(fs.readFileSync(config.json));

	return gulp.src(config.src)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(ejs(json))
		.pipe(gulp.dest(config.dest))
		.pipe(browser.reload({
			stream: true,
			once: true
		}));
});
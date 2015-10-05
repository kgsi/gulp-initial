var fs       = require('fs'),
	gulp     = require('gulp'),
	critical = require('critical'),
	config   = require('../config');

gulp.task('critical', function () {
	critical.generateInline({
		base: config.dest,
		src: 'index.html',
		//dest: 'assets/css/critical.css',
		htmlTarget: 'index.html',
		minify: true,
		width: 1000,
		height: 768
	});
});

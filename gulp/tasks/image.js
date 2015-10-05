var gulp          = require('gulp'),
	imagemin      = require('gulp-imagemin'),
	pngquant      = require('imagemin-pngquant'),
	jpegtran      = require('imagemin-jpegtran'),
	config        = require('../config').image;

gulp.task('image', function() {
	return gulp.src(config.src)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [
				pngquant({
					quality: '60-80',
					speed: 1
				}),
				jpegtran({progressive: true})
			]
		}))
		.pipe(gulp.dest(config.dest));
});
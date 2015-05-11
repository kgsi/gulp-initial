var gulp = require('gulp');
var browser = require('browser-sync');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var compass = require('gulp-compass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var ejs = require("gulp-ejs");
var critical = require('critical');
var styleguide = require('gulp-styledocco');

// browserSync
gulp.task("browser", function() {
	browser({
		// phpを使わない場合は以下をコメントアウト
		// server: {
		// 	baseDir: "./app/"
		// },
		proxy: 'localhost:8888'
	});
});

//reload
gulp.task('reload', function () {
	browser.reload();
});

// sass(compass)
gulp.task('compass', function () {
  return gulp.src('./src/sass/**/*.scss')
	.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
	.pipe(compass({ 
			config_file : './config.rb',
			comments : false,
			css : './app/assets/css/',
			sass: './src/sass/',
			image: './app/assets/images/'
	}))
	.pipe(gulp.dest('./app/assets/temp'))
	.pipe(browser.reload({stream:true}))
});

// js(lib)
gulp.task('js', function() {
	gulp.src('./src/js/libs/*.js')
		.pipe(concat('libs.js'))
		.pipe(uglify())
		// .pipe(rename({
		//     suffix: '.min'
		// }))
		.pipe(gulp.dest('./app/assets/js/'))
		.pipe(browser.reload({stream: true}));
});

// ejs
gulp.task('ejs', function() {
	gulp.src('./src/ejs/**/*.ejs')
	.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
	.pipe(ejs({
		msg: 'Hello Gulp!'
	}))
	.pipe(gulp.dest('./app/'))
	.pipe(browser.reload({stream:true}))
});

// Critical-path CSS
gulp.task('critical', function () {
	critical.generate({
		base: './app/',
		src: 'index.html',
		dest: 'assets/css/critical.css',
		minify: true,
		width: 1000,
		height: 768
	});
});

// Critical-path CSS(inline)
// gulp.task('critical', function () {
//   critical.generateInline({
// 		base: './app/',
// 		src: 'index.html',
// 		dest: 'assets/css/critical.css',
// 		minify: true,
//		width: 1000,
//		height: 768
// 	});
// });

// styleguide
gulp.task('styleguide', function () {
	gulp.src('./app/assets/css/*.css')
		.pipe(styleguide({
			out: 'docs',
			name: 'styleguide'
	}));
});


// watch
gulp.task('watch', function() {
	gulp.watch('./app/**/*.html',['reload']);
	gulp.watch('./src/sass/**/*.scss', ['compass'])
	gulp.watch('./src/js/libs/*.js', ['js']);

	gulp.watch("./src/ejs/**/*.ejs",['ejs']);
});

// gulp task
gulp.task("default",['browser','watch']);
var gulp = require('gulp');
var browser = require('browser-sync');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var compass = require('gulp-compass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var ejs = require("gulp-ejs");
var critical = require('critical');
var styleguide = require('gulp-styledocco');

// browserSync
gulp.task("browser", function() {
	browser({
		// phpを使わない場合は下記を有効にする
		server: {
			baseDir: "./app/"
		}
		// phpを使う場合は、下記を有効にして、appディレクトリを
		// MAMPを使うなどしてサーバ化する
		// proxy: 'localhost:8888'
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
		//.pipe(gulp.dest('./app/assets/temp'))
		.pipe(browser.reload({stream:true}))
});

// js(libs)
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
gulp.task("ejs", function() {
	gulp.src(
		["./src/ejs/**/*.ejs",'!' + "./src/ejs/**/_*.ejs"]
	)
	.pipe(ejs())
	.pipe(ejs({
		msg: "Hello Gulp!"
	}))
	.pipe(gulp.dest("./app"));
});

// critical-path css
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

// critical-path css(inline)
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

// image min
gulp.task('imagemin', function () {
  return gulp.src('./app/assets/images/**/*')
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant({
			quality: '60-80',
			speed: 1
		})]
	}))
	.pipe(gulp.dest('./app/assets/images/'));
});

// css min
gulp.task('cssmin', function () {
	gulp.src('./app/assets/css/**/*')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./app/assets/css/'));
});

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
	gulp.watch('./src/sass/**/*.scss', ['compass','reload'])
	gulp.watch('./src/js/libs/*.js', ['js']);
	gulp.watch("./src/ejs/**/*.ejs",['ejs']);
});

gulp.task("default",['browser','watch']);
gulp.task("min",['cssmin','imagemin']);